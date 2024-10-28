const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors({
  origin: '*', // Erlaubt alle Urspr�nge
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const jwtSecret = process.env.JWT_SECRET;

// Middleware zur Authentifizierung
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(new Date());
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/register', async (req, res) => {
    const { username, email, password, first_name, last_name } = req.body;
    let newUser;
  
    if (!username || !email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = await pool.query(
        'INSERT INTO user_account (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, hashedPassword, first_name, last_name]
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }

    try{
      const user_id = await pool.query('SELECT user_id FROM user_account WHERE username = $1;', [username]);
      console.log(user_id.rows[0].user_id);
      const newProfile = await pool.query(
        'INSERT INTO profiles (user_id, display_name) VALUES ($1, $2);', [user_id.rows[0].user_id, username]
      );
      
      res.status(201).json(newUser.rows[0])
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await pool.query('SELECT * FROM user_account WHERE email = $1', [email]);
      
      //If the account does not exist
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'account' });
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      
      //If the password does not exist
      if (!validPassword) {
        return res.status(401).json({ message: 'password' });
      }
  
      const token = jwt.sign({ userId: user.rows[0].user_id }, jwtSecret, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

app.post('/checkUsername', async(req, res) => {
    const result = await pool.query('SELECT username FROM user_account WHERE username = $1', [req.body.username]);
    
    let usernameAvailable;
    
    if(result.rows.length === 0){
      usernameAvailable = 0;
    } else {
      usernameAvailable = 1;
    }

    res.json({usernameAvailable: usernameAvailable});

});

app.post('/checkEmail', async(req, res) => {
    const email = await pool.query('SELECT username FROM user_account WHERE email = $1', [req.body.email]);

    let emailAvailable;
    if(email.rows.length === 0){
      emailAvailable = 0;
    } else {
      emailAvailable = 1;
    }

    res.json({emailAvailable: emailAvailable});
});

app.post('/deleteAccount', authMiddleware, async(req, res) => {
  try{
  const result = await pool.query('DELETE FROM user_account WHERE user_id = $1;', [req.userId]);


  res.json({result: result});
  } catch (error){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/userData/:userId?', authMiddleware, async (req, res) => {
  const userId = req.params.userId || req.userId; // Verwende userId aus URL oder aus dem Token
  try {
    const user = await pool.query(
      'SELECT username, first_name, last_name, email, phone_number, birthdate, hometown, instagram_name, snapchat_name, discord_name, tiktok_name, twitter_name, linkedin_name, role, display_name, profile_picture, biography ' +
      'FROM user_account u INNER JOIN profiles p on u.user_id = p.user_id ' +
      'WHERE u.user_id = $1;', 
      [userId]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const user = await pool.query('SELECT type, title, description, timestamp' +
      'FROM notifications INNER JOIN user_account ua on ua.user_id = notifications.user_id WHERE ua.user_id = $1;', [req.userId]);
    
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.get('/notificationByType', authMiddleware, async (req, res) => {
  try {
    const user = await pool.query('SELECT type, title, description, timestamp' +
      'FROM notifications INNER JOIN user_account ua on ua.user_id = notifications.user_id WHERE ua.user_id = $1 AND type = $2;', [req.userId, req.type]);
    
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/getGroupsFromUser', authMiddleware, async(req, res) => {
  try {
    const user = await pool.query('SELECT g.group_id, g.group_name, g.group_description ' +
    'FROM groups g INNER JOIN group_members gm on g.group_id = gm.group_id ' +
    'WHERE gm.user_id = $1;', [req.userId]);
    
    if (user.rows.length === 0) {
      return res.json([]);
    }

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/getFriendsOfUser', authMiddleware, async(req, res) => {
  try{
    const friends = await pool.query('SELECT f.user_id, p.display_name, p.profile_picture ' + 
      'FROM user_account f INNER JOIN friends fr ON f.user_id = fr.friend_id INNER JOIN profiles p on f.user_id = p.user_id ' +
      'WHERE fr.user_id = $1;', [req.userId]);

      if (friends.rows.length === 0) {
        return res.json([]);
      }
  
      res.json(friends.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

app.post('/searchUsers', async (req, res) => {
  try {
    const searchUsername = `%${req.body.username}%`;
    const users = await pool.query(
      "SELECT user_account.user_id, display_name, profile_picture " +
      "FROM user_account INNER JOIN profiles p on user_account.user_id = p.user_id " +
      "WHERE LOWER(user_account.username) LIKE $1 LIMIT 25;",
      [searchUsername]
    );

    if (users.rows.length === 0) {
      return res.json([]);
    }

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/addFriend/:friendId', authMiddleware, async (req, res) => {
  try{
    const result1 = await pool.query("INSERT INTO friends (user_id, friend_id) VALUES ($1, $2);", [req.userId, req.params.friendId]);
    const result2 = await pool.query("INSERT INTO friends (user_id, friend_id) VALUES ($1, $2);", [req.params.friendId, req.userId]);
    res.status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.post('/removeFriend/:friendId', authMiddleware, async (req, res) => {
  try{
    const result1 = await pool.query("DELETE FROM friends WHERE user_id = $1 AND friend_id = $2;", [req.userId, req.params.friendId]);
    const result2 = await pool.query("DELETE FROM friends WHERE user_id = $1 AND friend_id = $2;", [req.params.friendId, req.userId]);

    res.status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
