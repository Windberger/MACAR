import * as express from "express";
import {authMiddleware} from "../utils/authMiddleware";
import {pool} from "../database/db";
import * as bcrypt from "bcryptjs";

const router = express.Router();

// @ts-ignore
router.get('/getUser', authMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.user_id;
    const result = await pool.query("SELECT first_name, last_name, email, phone_number, bonus FROM user_account WHERE user_id = $1", [userId]);

    if (!result) {
        return res.status(404).json({message: 'No user with this id'});
    }

    res.status(200).json(result.rows[0]);
})

//@ts-ignore
router.post('/setBonus', authMiddleware, async (req, res) => {

    const {user, bonusCount} = req.body;
    // @ts-ignore
    const userId = req.user_id;

    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [userId]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    const result = await pool.query("UPDATE user_account SET bonus = $1 WHERE user_id = $2", [bonusCount, user]);

    if (!result) {
        return res.status(404).json({message: 'No user with this id'});
    }

    return res.status(200);
})

// @ts-ignore
router.put('/updateUser', authMiddleware, async (req, res) => {
    let {user, first_name, last_name, email, phone_number, password, userId} = req.body;

    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [userId]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    let result;

    if (password) {
        password = await bcrypt.hash(password, 10);
        result = await pool.query("UPDATE user_account SET first_name = $1, last_name = $2, email = $3, phone_number = $4, password = $5 WHERE user_id = $6", [first_name, last_name, email, phone_number, password, user]);
    } else {
        result = await pool.query("UPDATE user_account SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE user_id = $5", [first_name, last_name, email, phone_number, user]);
    }

    if (!result) {
        return res.status(404).json({message: 'No user with this id'});
    }

    res.status(200);
})

// @ts-ignore
router.delete('/deleteUser', authMiddleware, async (req, res) => {
    const {user} = req.body;
    // @ts-ignore
    const {userId} = req.user_id;

    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [userId]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    const result = await pool.query("DELETE FROM user_account WHERE user_id = $1", [user]);

    if (!result) {
        return res.status(404).json({message: 'No user with this id'});
    }

    res.status(200);
})


export default router;