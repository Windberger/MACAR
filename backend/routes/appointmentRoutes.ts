import * as express from "express";
import {authMiddleware} from "../utils/authMiddleware";
import {pool} from "../database/db";
import { QueryResult } from "pg";

const router = express.Router();

// @ts-ignore
router.get('/getAppointmentsByUser', authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.user_id;
    const {user} = req.params;

    let result: QueryResult;
    if (user) {
        result = await pool.query("SELECT appointment_id, appointment_datetime, appointment_type, description FROM appointment WHERE user_id = $1 ORDER BY appointment_datetime LIMIT 100;", [user]);
    } else {
        result = await pool.query("SELECT appointment_id, appointment_datetime, appointment_type, description FROM appointment WHERE user_id = $1 ORDER BY appointment_datetime LIMIT 100;", [userId]);
    }
    res.status(200).json(result.rows);
})

// @ts-ignore
router.get('/getAppointmentsByWeek', authMiddleware, async (req, res) => {
    // @ts-ignore
    let { date }: string | Date = req.query;
    date = new Date(date);

    if(!date) {
        return res.status(400).json({message: 'Missing required information'});
    }

    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(date);
    weekEnd.setDate(date.getDate() + (6 - date.getDay()));
    weekEnd.setHours(23, 59, 59, 999);
    console.log(weekStart, weekEnd);


    const result = await pool.query("SELECT appointment_id, appointment_datetime, appointment_type, description, appointment.user_id, first_name, last_name, email, bonus FROM appointment INNER JOIN user_account ON appointment.user_id = user_account.user_id WHERE appointment_datetime >= $1 AND appointment_datetime <= $2 ORDER BY appointment_datetime;", [weekStart, weekEnd]);

    res.status(200).json(result.rows);
})

// @ts-ignore
router.get('/getAppointmentById', authMiddleware, async (req, res) => {

    const {appointment_id} = req.body;
    if (!appointment_id) {
        return res.status(400).json({message: 'Missing required information'});
    }
    const result = await pool.query("SELECT appointment_id, appointment_datetime, appointment_type, description FROM appointment WHERE appointment_id = $1;", [appointment_id]);

    res.status(200).json(result.rows[0]);
})

// @ts-ignore
router.post('/addAppointment', authMiddleware, async (req, res) => {
    let {user, datetime, type, description} = req.body;

    console.log("Adding appointment:", req.body);
    if (!user || !datetime || !type) {
        return res.status(400).json({message: 'Missing required information'});
    }

    // @ts-ignore
    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [req.user_id]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    if (!description) {
        description = 'NULL';
    }

    const result = await pool.query("INSERT INTO appointment (user_id, appointment_datetime, appointment_type, description) " +
        "VALUES ($1, $2, $3, $4);", [user, datetime, type, description]);

    if (!result) {
        return res.status(500).json({message: 'Error adding appointment'});
    } else {
        res.status(200);
    }
})

// @ts-ignore
router.delete('/deleteAppointment', authMiddleware, async (req, res) => {
    let {appointment_id} = req.body;

    if (!appointment_id) {
        return res.status(400).json({message: 'Missing required information'});
    }

    // @ts-ignore
    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [req.user_id]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    const result = await pool.query("DELETE FROM appointment WHERE appointment_id = $1;", [appointment_id]);

    if (!result) {
        return res.status(500).json({message: 'Error deleting appointment'});
    } else {
        res.status(200);
    }
})

// @ts-ignore
router.put('/updateAppointment', authMiddleware, async (req, res) => {
    let {appointment_id, datetime, type, description} = req.body;

    if (!appointment_id || !datetime || !type) {
        return res.status(400).json({message: 'Missing required information'});
    }

    // @ts-ignore
    const is_admin = await pool.query("SELECT is_admin FROM user_account WHERE user_id = $1;", [req.user_id]);
    if (!is_admin || !is_admin.rows[0].is_admin) {
        return res.status(403).json({message: 'Unauthorized'});
    }

    if (!description) {
        description = 'NULL';
    }

    const result = await pool.query("UPDATE appointment SET appointment_datetime = $1, appointment_type = $2, description = $3 WHERE appointment_id = $4;",
        [datetime, type, description, appointment_id]);

    if (!result) {
        return res.status(500).json({message: 'Error updating appointment'});
    } else {
        res.status(200);
    }
})

export default router;