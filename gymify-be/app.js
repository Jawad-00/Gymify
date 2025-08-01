const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const memberRoutes = require('./routes/member.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes); // 👈 added here

module.exports = app;
