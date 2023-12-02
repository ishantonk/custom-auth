import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/userModels";
import connect from "@/utils/config/database";

export async function POST(request: NextRequest) {
    connect(); // connect to database

    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    message: "All fields are required",
                    success: false,
                },
                { status: 400 }
            );
        }

        // find email is already exist
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                {
                    message: "Email already exist",
                    success: false,
                },
                { status: 409 }
            );
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();

            return NextResponse.json(
                {
                    message: "User created successfully",
                    success: true,
                    user: newUser,
                },
                { status: 201 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
                error: error,
            },
            { status: 500 }
        );
    }
}
