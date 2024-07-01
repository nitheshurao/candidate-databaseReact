const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://root:root@cluster0.rtist3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cnd';

// app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    // res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next();
})
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(candidateRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
