// middleware.js

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    console.log(token)
    if(!token) {
        return NextResponse.json({message: "No Token..."})
    }

    try {
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        console.log("decodedJwt:", decodedJwt)
        return NextResponse.next()
    } catch(err) {
        return NextResponse.json({message: "Wrong Token. Please login again."})
    }
    
}

export const config = {
    matcher: [
        "/api/item/create", 
        "/api/item/update/:path*",
        "/api/item/delete/:path*"
    ],
}