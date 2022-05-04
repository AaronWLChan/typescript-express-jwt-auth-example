import mongoose from "mongoose";
import { User } from "./types";

const schema = new mongoose.Schema<User>(
    {
        email: { type: "String", required: true },
        password: { type: "String", required: true }
    }
)

export default mongoose.model<User>("User", schema)