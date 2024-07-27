import pymysql
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Replace these with your actual database details
db_endpoint = 'corneliusauthappdb.czoke488w3yy.us-east-1.rds.amazonaws.com'
db_name = 'corneliusauthappdb'
db_user = 'admin'
db_password = os.getenv('DB_PASSWORD')

if not db_password:
    raise ValueError("DB_PASSWORD environment variable not set")

connection = None

try:
    print("Attempting to connect to the MySQL server...")
    connection = pymysql.connect(
        host=db_endpoint,
        user=db_user,
        password=db_password,
        connect_timeout=10  # Set a timeout to avoid hanging indefinitely
    )
    print("Connection to MySQL server successful!")
    cursor = connection.cursor()
    
    # Check if the database exists and create it if it does not
    cursor.execute(f"SHOW DATABASES LIKE '{db_name}';")
    result = cursor.fetchone()
    if not result:
        print(f"Database '{db_name}' does not exist. Creating database...")
        cursor.execute(f"CREATE DATABASE {db_name};")
        print(f"Database '{db_name}' created successfully.")
    
    # Connect to the specific database
    connection.select_db(db_name)
    
    # SQL statement to create a new table
    create_table_query = """
    CREATE TABLE IF NOT EXISTS `User` (
    `Username` VARCHAR(25) NOT NULL,
    `Password` VARCHAR(500) NOT NULL,
    `userImage` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`Username`))
    ENGINE = InnoDB;
    """
    
    cursor.execute(create_table_query)
    connection.commit()
    print("Table 'User' created successfully.")
    
except pymysql.MySQLError as error:
    print(f"MySQL Error: {error}")
except Exception as error:
    print(f"General Error: {error}")
finally:
    if connection:
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
