CREATE TABLE interns(
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Role NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE
)
INSERT INTO Interns (Name,Role,Email)
VALUES
    ('Amaka Okoro', 'Backend Developer', 'amaka.okoro@decodelabs.com'),
    ('David Musa', 'Cloud Engineer', 'david.musa@decodelabs.com'),
    ('Grace Bello', 'Data Analyst', 'grace.bello@decodelabs.com');

    SELECT * FROM Interns;