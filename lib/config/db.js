import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://prasadsontakke731:xQCB8cYVyGpR6V9t@cluster0.56x1ddt.mongodb.net/todo-app")
    console.log("DB Connected");
}