import { User } from "@/app/models";
import connect from "@/utils/config/database";
import { createToken, getNewToken, sendEmail } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    connect(); // connect to database

    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                {
                    message: "Email is required",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        } else {
            const user = await User.findOne({ email });

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
            } else if (!user.verified) {
                return NextResponse.json(
                    {
                        message: "User is not verified",
                        success: false,
                    },
                    {
                        status: 403,
                    }
                );
            } else {
                const recoveryToken = getNewToken({
                    type: "recovery",
                    data: {
                        _id: user._id,
                        email: user.email,
                    },
                });

                await createToken({
                    userId: user._id,
                    token: recoveryToken!,
                    type: "recovery",
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });

                // send email
                await sendEmail({
                    address: email,
                    subject: "Account Recovery",
                    html: `<h1>Account Recovery</h1>
                    <p>Click the link below to reset your password</p>
                    <a href="${process.env.DOMAIN}/change-password/?token=${recoveryToken}">Reset Password</a>`,
                });

                // send response
                return NextResponse.json(
                    {
                        message: "Recovery email sent",
                        success: true,
                    },
                    {
                        status: 200,
                    }
                );
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
