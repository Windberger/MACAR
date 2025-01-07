CREATE TABLE user_account (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    bonus INTEGER NOT NULL

);

-- make phone number unique
ALTER TABLE user_account ADD CONSTRAINT unique_phone_number UNIQUE(phone_number);


SELECT * FROM user_account;
SELECT * FROM appointment;

INSERT INTO user_account (first_name, last_name, email, phone_number, password) VALUES ('David2', 'Fink', 'david2@fink.com', '+4364465184936', 'password');
INSERT INTO appointment (user_id, appointment_datetime, appointment_type, description) VALUES (89, to_timestamp('30.12.2024,20:00', 'DD.MM.YYYY,HH24:MI'), 'cold', 'Auto reparieren');

CREATE TABLE appointment (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    appointment_datetime TIMESTAMP NOT NULL,
    appointment_type VARCHAR(30) NOT NULL,
    description VARCHAR(255)
);

DROP TABLE appointment;

-- rename appointment_date column to appointment_datetime
ALTER TABLE appointment RENAME COLUMN appointment_date TO appointment_datetime;


CREATE OR REPLACE FUNCTION delete_invalid_tokens()
RETURNS TRIGGER AS $$
BEGIN
   DELETE FROM refresh_tokens WHERE created_at < NOW() - INTERVAL '365 days';
   RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_invalid_tokens_trigger
AFTER INSERT ON refresh_tokens
FOR EACH STATEMENT
EXECUTE FUNCTION delete_invalid_tokens();