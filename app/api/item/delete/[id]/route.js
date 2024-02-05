// delete/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id)
        if(singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({_id: context.params.id})
            return NextResponse.json({message: "Delete Item Success"})
        } else {
            return NextResponse.json({message: "You don't have permission to delete this item."})
        }

    } catch(err) {
        return NextResponse.json({message: "Failed. Something went wrong..."})
    }
}
