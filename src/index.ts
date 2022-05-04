import express from 'express'
import routes from './endpoints'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//Load env
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

//Accept JSON
app.use(express.json());

//Use Routes
app.use("/users", routes.user)

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Listen
app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})