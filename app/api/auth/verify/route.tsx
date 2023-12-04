import { Token, User } from "@/app/models";
import connect from "@/utils/config/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    connect(); // connect to database

    try {
        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json(
                {
                    message: "Token is required",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        } else {
            const verifiedDbToken = await Token.findOne({
                token,
                type: "verification",
                revoked: false,
                expiresAt: { $gt: new Date() },
            });

            console.log(verifiedDbToken, "verifiedDbToken", request.ip, "ip");

            if (!verifiedDbToken) {
                return NextResponse.json(
                    {
                        message: "Token not found",
                        success: false,
                    },
                    {
                        status: 404,
                    }
                );
            } else {
                const user = await User.findOne({
                    _id: verifiedDbToken.userId,
                });

                if (!user) {
                    return NextResponse.json(
                        {
                            message: "User not found",
                            success: false,
                        },
                        {
                            status: 404,
                        }
                    );
                } else {
                    // update token
                    await verifiedDbToken.updateOne({ revoked: true });

                    // update user
                    await user.updateOne({ verified: true });

                    const response = NextResponse.json(
                        {
                            message: "Email verified successfully",
                            success: true,
                        },
                        {
                            status: 200,
                        }
                    );

                    return response;
                }
            }
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: (error as Error).message,
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
