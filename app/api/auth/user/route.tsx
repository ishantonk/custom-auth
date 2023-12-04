import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/utils/helpers";
import connect from "@/utils/config/database";
import User from "@/app/models/userModel";

export async function GET(request: NextRequest) {
    connect(); // connect to database

    try {
        // decode token
        const token = request.cookies.get("accessToken")?.value || "";
        const userId = await decodeToken(token)._id;
        console.log(token, userId);

        const user = await User.findOne({ _id: userId }).select(
            "-password -role"
        );

        return NextResponse.json(
            {
                message: "User fetched successfully",
                success: true,
                data: user,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: (error as Error).message,
                success: false,
            },
            {
                status: 400,
            }
        );
    }
}
