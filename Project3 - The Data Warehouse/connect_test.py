import pyodbc

server = 'jeremy-project3-sql-server-2026.database.windows.net'
database = 'Decodelabs-Project3DB'
username = 'YPUR USERNAME HERE'
password = 'YOURPASSWORD HERE'
driver = '{ODBC Driver 18 for SQL Server}'

conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'
conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

cursor.execute("SELECT * FROM Interns")
for row in cursor.fetchall():
       print(row)

conn.close()