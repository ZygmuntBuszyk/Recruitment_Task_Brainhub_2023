CREATE TABLE IF NOT EXISTS log
(
    id char(64) PRIMARY KEY,
    name varchar(64) NOT NULL,
    email varchar(64) NOT NULL,
    log LONGTEXT
);