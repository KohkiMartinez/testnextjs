// utils/database

import mongoose from "mongoose"

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://mongodb2:MPprbHyEFsYfiPWm@cluster0.vb5hnrk.mongodb.net/nextjsDatabase?retryWrites=true&w=majority")
        console.log("Success: Connect to MongoDB")
    } catch(err) {
        console.log("Failure: Unconnect to MongoDB")
        throw new Error()
    }
}

export default connectDB