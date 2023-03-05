CREATE TABLE IF NOT EXISTS log
(
    id char(64) PRIMARY KEY,
    name varchar(64),
    email varchar(64),
    log NVARCHAR(MAX)
);