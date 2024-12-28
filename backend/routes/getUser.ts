import * as express from "express";
import {authMiddleware} from "../utils/authMiddleware";
import {pool} from "../database/db";

const router = express.Router();

// @ts-ignore
router.get('/getUser', authMiddleware, async (req, res) => {

    // @ts-ignore
    const userId = req.user_id;
    console.log(userId);
    const result = await pool.query("SELECT first_name, last_name, email, phone_number, bonus FROM user_account WHERE user_id = $1", [userId]);


    if (!result) {
        return res.status(404).json({message: 'No user with this id'});
    }

    res.status(200).json(result.rows[0]);
})
export default router;