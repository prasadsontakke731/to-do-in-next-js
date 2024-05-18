import { connectDB } from "@/lib/config/db"
import TodoModel from "@/lib/models/TodoModel"

const { NextResponse } = require("next/server")

const loadDB = async () => {
    await connectDB()
}
loadDB()

export async function GET(req) {

    const todos = await TodoModel.find({})
    return NextResponse.json({ todos: todos })
}

export async function POST(req) {
    const { title, description } = await req.json()

    await TodoModel.create({
        title,
        description
    })
    return NextResponse.json({ msg: "Todo Created" })
}

export async function DELETE(request) {

    const mongoId = await request.nextUrl.searchParams.get('mongoId')

    await TodoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({ msg: "Todo Deleted" })
}

export async function PUT(request) {

    const mongoId = await request.nextUrl.searchParams.get('mongoId')

    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true
        }
    })
    return NextResponse.json({ msg: "Todo Completed" })
}

