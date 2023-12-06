import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connect from "@/utils/config/database";
import { Token, User } from "@/app/models";

export async function POST(request: NextRequest) {
    connect(); // Connect to database

    try {
        const body = await request.json();
        const { password, token } = body;

        if (!password) {
            return NextResponse.json(
                {
                    message: "All fields are required",
                    success: false,
                },
                { status: 400 }
            );
        } else {
            if (!token) {
                return NextResponse.json(
                    {
                        message: "Token is required",
                        success: false,
                    },
                    { status: 400 }
                );
            } else {
                const recoveryDbToken = await Token.findOne({
                    token,
                    type: "recovery",
                    revoked: false,
                    expiresAt: { $gt: new Date() },
                });

                if (!recoveryDbToken) {
                    return NextResponse.json(
                        {
                            message: "Token not found or token is expired", 
                            success: false,
                        },
                        { status: 404 }
                    );
                } else {
                    const user = await User.findOne({
                        _id: recoveryDbToken.userId,
                    });

                    if (!user) {
                        return NextResponse.json(
                            {
                                message: "User not found",
                                success: false,
                            },
                            { status: 404 }
                        );
                    } else {
                        // update token
                        await recoveryDbToken.updateOne({ revoked: true });

                        // change or update user password
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(
                            password,
                            salt
                        );

                        await user.updateOne({ password: hashedPassword });

                        return NextResponse.json(
                            {
                                message: "Password changed successfully",
                                success: true,
                            },
                            {
                                status: 200,
                            }
                        );
                    }
                }
            }
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error" + (error as Error).message,
                success: false,
                error: (error as Error).message,
            },
            {
                status: 500,
            }
        );
    }
}
