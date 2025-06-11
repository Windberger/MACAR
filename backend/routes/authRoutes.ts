import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';
import {pool} from '../database/db';
import * as jwt from 'jsonwebtoken';
import {DB_User} from "../database/interfaces";
import { sendEmailVerification } from '../utils/verificationEmail';


const router = express.Router();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const VERIFY_TOKEN_SECRET = process.env.VERIFY_TOKEN_SECRET;
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME;
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME;
const VERIFY_TOKEN_LIFETIME = process.env.VERIFY_TOKEN_LIFETIME;


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
    let user: { user_id: any; };
    try {
        const result = await pool.query(
            "INSERT INTO user_account (first_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
            [first_name, last_name, email, phone_number, hashedPassword]
        );
        res.status(201).json({userId: result.rows[0].id});
         user = result.rows[0];
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
   // const verificationToken = jwt.sign({id: user.user_id}, VERIFY_TOKEN_SECRET, {expiresIn: VERIFY_TOKEN_LIFETIME});

    // TODO: call function to send email

    //
    // console.log("sendEmaiil")
    // await sendEmailVerification(email, verificationToken);


});

// @ts-ignore
router.post('/login', async (req: express.Request, res: express.Response) => {
    const {email, phoneNumber, password} = req.body;
    console.log("login")

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

        const accessToken = jwt.sign({id: user.user_id}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_LIFETIME});
        const refreshToken = jwt.sign({id: user.user_id}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFETIME});

        try {
            await pool.query('INSERT INTO refresh_tokens (token) VALUES ($1)', [refreshToken]);


            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true, // Nur für HTTPS
                sameSite: 'none',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 365) // 30 Tage
            });

            res.json({accessToken});
        } catch (error) {
            console.error('Error while saving refresh token:', error);
            res.sendStatus(500);
        }
    } catch (err) {
        res.status(500).json({message: 'Error logging in'});
    }
    console.log("login")

});


// @ts-ignore
router.post('/token', async (req, res) => {

    console.log("Token request received");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);

        if (result.rowCount === 0) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: { id: any; }) => {
            if (err) return res.sendStatus(403);

            const accessToken = jwt.sign({id: user.id}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_LIFETIME});
            res.json({accessToken});
        });
    } catch (error) {
        console.error('Error while checking refresh token:', error);
        res.sendStatus(500);
    }
});

// @ts-ignore
router.post('/logout', async (req, res) => {
    console.log("Logout request received");
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(400);
    }

    try {
        // Lösche das Refresh Token aus der Datenbank
        await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);

        res.clearCookie('refreshToken');
        res.sendStatus(204);

        console.log("User logged out");
    } catch (error) {
        console.error('Error while deleting refresh token: ', error);
        res.sendStatus(500);
    }
});

router.post('/verify-email', req => {

    console.log("Verify Email!!!!!!")
})

// TODO: user clicked link in email and now check if it is the same token as in the db

// router.get('/verify-email', async (req, res) => {
//     const {token} = req.query;
//
//     if (token != ) {
//         return res.status(400).json({message: 'Invalid token'});
//     }
//
//     res.status(200).json({message: 'Email verified'});
//
//
// });

export default router;
