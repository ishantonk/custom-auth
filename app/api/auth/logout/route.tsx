import { NextResponse } from "next/server";
import connect from "@/utils/config/database";

export async function GET() {
    connect() // connect to database

    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            },
            {
                status: 200,
            }
        );

        // clearing the cookies
        response.cookies.set({
            name: "authenticationToken",
            value: "",
            maxAge: 0,
            httpOnly: true,
        });

        response.cookies.set({
            name: "accessToken",
            value: "",
            maxAge: 0,
            httpOnly: true,
        });

        response.cookies.set({
            name: "refreshToken",
            value: "",
            maxAge: 0,
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
