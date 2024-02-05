//readall/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET() {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return NextResponse.json({message: "Read All Success", allItems: allItems})
    } catch(err) {
        return NextResponse.json({message: "Failed. Something went wrong..."})
    }
}

export const revalidate = 0