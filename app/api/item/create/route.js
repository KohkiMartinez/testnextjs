// create/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function POST(req) {
    const reqBody = await req.json()

    try {
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({message: "Success Create an Item"})
    } catch(err) {
        return NextResponse.json({message: "Failure, unable to create an item..."})
    }

}

