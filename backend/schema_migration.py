import sqlite3
import os

DB_PATH = os.path.join("aiva.db")

def migrate():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check existing columns
    cursor.execute("PRAGMA table_info(calls)")
    columns = [info[1] for info in cursor.fetchall()]
    
    new_columns = [
        ("phone_number", "VARCHAR(20)"),
        ("customer_name", "VARCHAR(100)"),
        ("service_requested", "VARCHAR(100)"),
        ("staff_assigned", "VARCHAR(100)"),
        ("appointment_datetime", "DATETIME"),
        ("price", "INTEGER"),
        ("call_outcome", "VARCHAR(50)"),
        ("confidence", "VARCHAR(20)"),
        ("summary", "TEXT"),
        ("timeline_events", "TEXT")
    ]
    
    for col_name, col_type in new_columns:
        if col_name not in columns:
            try:
                cursor.execute(f"ALTER TABLE calls ADD COLUMN {col_name} {col_type}")
                print(f"Added column {col_name}")
            except sqlite3.OperationalError as e:
                print(f"Error adding {col_name}: {e}")
                
    conn.commit()
    conn.close()
    print("Migration complete.")

if __name__ == "__main__":
    migrate()
