import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def exec_statement(conn, stmt):
    try:
        with conn.cursor() as cur:
            cur.execute(stmt)
            row = cur.fetchall()
            conn.commit()
            if row: print(row)
    except psycopg2.ProgrammingError:
        return

def addfoods(foodarray):
    statements = ["CREATE TABLE IF NOT EXISTS foodhistory (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), food STRING, time TIMESTAMPTZ DEFAULT NOW())"]
    for food in foodarray:
        statements.append(f"INSERT INTO foodhistory (food) VALUES ('{food}');")
    statements.append("SELECT food FROM foodhistory;")
    return statements

def addemissions(emissionsarray):
    statements = ["CREATE TABLE IF NOT EXISTS emissions (food STRING PRIMARY KEY, totalemission float);"]
    for emission in emissionsarray:
        statements.append(f"INSERT INTO emissions (food, totalemission) VALUES ('{emission[0]}', {emission[1]});")
    return statements

def main():
    # Connect to CockroachDB
    connection = psycopg2.connect(os.getenv('KEY'))
    
    passed = ["Beef", "Chicken"]
    statements = addfoods(passed)
    #emissions = [["apple", 0.3], ["banana", 0.23]]
    '''
    if:
        
    else:
        statements = addemissions(passed)
    '''
    for statement in statements:
        print(statement)
        exec_statement(connection, statement)

    # Close communication with the database
    connection.close()


if __name__ == "__main__":
    main()