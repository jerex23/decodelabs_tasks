Project 3: The Data Warehouse
Scenario

An e commerce company is managing customer data in Excel sheets and needs a reliable, scalable, and secure cloud database as its user base grows.

Why a relational database fit better than NoSQL

The scenario calls for records with a fixed, predictable structure: Name, Role, and Email for each intern. This kind of consistent, tabular structure fits a relational database naturally, since every record shares the same set of fields and benefits from the strict schema and standard query language that a relational system provides. NoSQL databases are better suited to data whose shape can vary from record to record, which is not the case here.

Server and firewall setup

An Azure SQL Database was created on the free serverless offer, under a new logical SQL server with a server admin login set at creation. Two firewall settings were required on the server, not the database, before any client tool could reach it:

Allow Azure services and resources to access this server, set to yes.
The client machine's current IP address added explicitly to the allowed list under the server's networking settings.

The serverless tier also pauses the database automatically after a period of inactivity, so a connection made after a pause takes slightly longer while it resumes.

Tooling switch: Azure Data Studio to VS Code

Azure Data Studio, originally intended as the client tool for this project, was retired by Microsoft on February 28, 2026, and no longer receives updates. Visual Studio Code with the MSSQL extension was used instead, following Microsoft's own migration guidance. The connection required Authentication Type set explicitly to SQL Login, since the default authentication option prompted for a Microsoft account sign in rather than the server's own admin credentials.

Table and data
sql
CREATE TABLE Interns (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Role NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL
);

Dummy records were inserted and confirmed with a SELECT * FROM Interns; query, returning the auto generated ID values alongside the inserted Name, Role, and Email fields.

Bonus: Python connection

A connect_test.py script using the pyodbc library connected to the same database independently of VS Code and printed the same Interns records to the terminal, confirming the data was reachable programmatically and not just through a SQL client. The script reads the connection password from a placeholder rather than a hardcoded value, since a real password should never be committed to a public repository.
