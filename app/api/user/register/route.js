// user/register/router.js

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        await UserModel.create(reqBody)
        return NextResponse.json({message: "Register Success"})

    } catch(err) {
        return NextResponse.json({message: "Failed. Something went wrong..."})
    }
    
}