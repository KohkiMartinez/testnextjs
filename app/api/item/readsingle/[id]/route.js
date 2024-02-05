//readsingle/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request, context) {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id)
        return NextResponse.json({message: "Read Single Success", singleItem: singleItem})
    } catch(err) {
        return NextResponse.json({message: "Failed. Something went wrong..."})
    }
    
}