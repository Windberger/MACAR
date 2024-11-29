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

SELECT * FROM user_account;
SELECT * FROM appointment;

INSERT INTO user_account (first_name, last_name, email, phone_number, password) VALUES ('David2', 'Fink', 'david2@fink.com', '+4364465184936', 'password');
INSERT INTO appointment (user_id, appointment_date) VALUES (1, to_date('2024-06-01', 'YYYY-MM-DD'));

CREATE TABLE appointment (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    appointment_date TIMESTAMP NOT NULL
);