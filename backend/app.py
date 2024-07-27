from flask import Flask, jsonify, request
import bcrypt
app = Flask(__name__)
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import pymysql
import base64
import boto3
import jwt


load_dotenv()

SECRET_KEY = os.getenv("JWT_KEY")  # Use appropriate key or public key
ALGORITHM = 'HS256'  # Adjust according to your algorithm (e.g., HS256, RS256)
db_endpoint = 'corneliusauthappdb.czoke488w3yy.us-east-1.rds.amazonaws.com'
db_name = 'corneliusauthappdb'
db_user = 'admin'
db_password = os.getenv('DB_PASSWORD')

s3_client = boto3.client('s3')
rekognition_client = boto3.client('rekognition')
bucket_name = 'authphotobucket'

def get_user_details(username):
    connection = None
    try:
        connection = pymysql.connect(
            host=db_endpoint,
            user=db_user,
            password=db_password,
            database=db_name,
            connect_timeout=10
        )
        cursor = connection.cursor()
        cursor.execute("SELECT Password, userImage FROM User WHERE Username = %s", (username,))
        result = cursor.fetchone()
        if result:
            return {'password': result[0], 'userImage': result[1]}
        return None
    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")
    finally:
        if connection:
            cursor.close()
            connection.close()
    return None


@app.route('/api/register', methods=['POST'])
def sign_up():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user_photo_base64 = data.get('UserPhoto')
    if not username or not password or not user_photo_base64:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Hash the password
    hashed_password = get_hashed_password(password)
    
    if user_photo_base64.startswith('data:image/jpeg;base64,'):
        user_photo_base64 = user_photo_base64[len('data:image/jpeg;base64,'):]

# Decode the Base64 string
    image_data = base64.b64decode(user_photo_base64)
    # Save the image to S3
    image_key = f"{username}.jpg"
    s3_client.put_object(Bucket=bucket_name, Key=image_key, Body=image_data)
    
    connection = None
    try:
        connection = pymysql.connect(
            host=db_endpoint,
            user=db_user,
            password=db_password,
            database=db_name,
            connect_timeout=10
        )
        cursor = connection.cursor()
        cursor.execute("INSERT INTO User (Username, Password, userImage) VALUES (%s, %s, %s)", (username, hashed_password, image_key))
        connection.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except pymysql.MySQLError as error:
        print(f"MySQL Error: {error}")
        return jsonify({'error': 'An error occurred while creating the user'}), 500
    finally:
        if connection:
            cursor.close()
            connection.close()



@app.route('/api/login', methods=['POST'])
def handle_auth():
    data = request.get_json()
    username = data.get('username')
    provided_password = data.get('password')
    user_photo_base64 = data.get('UserPhoto')
    user_details = get_user_details(username)
    if not user_details:
        return jsonify({'error': 'User not found'}), 404
    
    stored_password = user_details['password']
    stored_user_image = user_details['userImage']
    # Compare the provided password with the stored password
    if verify_password(provided_password, stored_password) == False:
        return jsonify({'error': 'Invalid password'}), 401
        
    if user_photo_base64.startswith('data:image/jpeg;base64,'):
        user_photo_base64 = user_photo_base64[len('data:image/jpeg;base64,'):]

    user_photo_data = base64.b64decode(user_photo_base64)
    

    face_matches = compare_faces(stored_user_image, user_photo_data)
    if(face_matches == 1):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'error': 'Face not recognized'}), 401


@app.route('/api/verify-token', methods=['POST'])
def verify_token():
    data = request.get_json()
    token = data.get('token')
    
    if not token:
        return jsonify({'valid': False}), 400
    
    try:
        # Decode and verify the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # Optionally, you can also validate the expiration date here
        return jsonify({'valid': True})
    except jwt.ExpiredSignatureError:
        return jsonify({'valid': False, 'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'valid': False, 'error': 'Invalid token'}), 401


def compare_faces(source_image_key, target_image_data):
    response = rekognition_client.compare_faces(
        SourceImage={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': source_image_key
            }
        },
        TargetImage={
            'Bytes': target_image_data
        },
        SimilarityThreshold=80
    )

    matches = len(response['FaceMatches'])
    for face_match in response['FaceMatches']:
        position = face_match['Face']['BoundingBox']
        similarity = str(face_match['Similarity'])
        print(f'The face at {position["Left"]} {position["Top"]} matches with {similarity}% confidence')

    return matches



def get_hashed_password(plain_text_password):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())

def verify_password(provided_password, stored_hashed_password):
    # Ensure stored_hashed_password is bytes
    if isinstance(stored_hashed_password, str):
        stored_hashed_password = stored_hashed_password.encode('utf-8')
    # Verify the provided password against the stored hashed password
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_hashed_password)


if __name__ == '__main__':
    app.run(debug=True)
