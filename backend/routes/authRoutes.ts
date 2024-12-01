import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';
import {pool} from '../database/db';
import {generateToken} from '../utils/jwtUtils';
import {DB_User} from "../database/interfaces";

const router = express.Router();

// @ts-ignore
router.post('/register', async (req: express.Request, res: express.Response) => {
    const {first_name, last_name, email, phone_number, password} = req.body;

    if (!first_name || !last_name || (!email && !phone_number) || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // Check email format with validator library
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({message: 'Invalid email'});
    }

    // Check phone number format with validator library
    if (phone_number && !validator.isMobilePhone(phone_number, 'any')) {
        return res.status(400).json({message: 'Invalid phone number'});
    }

    // Check password rules
    if (password.length < 8) {
        return res.status(400).json({message: 'Invalid password'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            "INSERT INTO user_account (first_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
            [first_name, last_name, email, phone_number, hashedPassword]
        );
        res.status(201).json({userId: result.rows[0].id});
    } catch (err: any) {

        //Duplicate key error
        if (err.code === '23505') {
            if (err.detail.includes('email')) {
                return res.status(409).json({message: 'Email is already in use'});
            } else if (err.detail.includes('phone_number')) {
                return res.status(409).json({message: 'Phone number is already in use'});
            }
        }

        res.status(500).json({message: 'Error registering user'});
    }
});

// @ts-ignore
router.post('/login', async (req: express.Request, res: express.Response) => {
    const {email, phoneNumber, password} = req.body;

    if (!password || (!email && !phoneNumber)) {
        return res.status(400).json({message: 'Not all fields provided'});
    }

    try {
        const result = await pool.query(
            'SELECT * FROM user_account WHERE email = $1 OR phone_number = $2',
            [email, phoneNumber]
        );

        const user: DB_User = result.rows[0];
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = generateToken(user.user_id);
        res.status(200).json({token});
    } catch (err) {
        res.status(500).json({message: 'Error logging in'});
    }
});

export default router;
