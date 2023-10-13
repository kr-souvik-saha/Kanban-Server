const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {
    dbConnect
} = require('./config/dbConnection');
const userRoute = require('./Auth/route/userRoute');
const containerRoute = require('./Kanban/Route/containerRoute');
const taskRoute = require('./Kanban/Route/taskRoute');

const app = express();

dbConnect();

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Success"
    })
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/auth', userRoute.router);
app.use('/container', containerRoute.router);
app.use('/task', taskRoute.router);

app.all('*', (req, res) => {
    res.status(404).json({
        message: "not found"
    })
})


app.listen(process.env.DEV_PORT, () => {
    console.log(`Listening to port: ${process.env.DEV_PORT}`);
})