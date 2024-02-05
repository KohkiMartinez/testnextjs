// user/login/route.js

import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({email: reqBody.email})
        if(savedUserData) {
            if(reqBody.password === savedUserData.password) {
                const secretKey = new TextEncoder().encode("next-market-app-book")
                const payload = {
                    email: reqBody.email,
                }
                const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime('1d').sign(secretKey)
                
                return NextResponse.json({message: "Login Success", token: token})
            } else {
                return NextResponse.json({message: "Failed. Something went wrong..."})
            }
            
        } else {
            return NextResponse.json({message: "Failed. Please Create an account."})
        }
        
    } catch(err) {
        return NextResponse.json({message: "Failed. Something went wrong..."})
    }
}