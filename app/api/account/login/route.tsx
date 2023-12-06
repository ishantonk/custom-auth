import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User, Token } from "@/app/models";
import { getNewToken, createToken } from "@/utils/helpers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "All fields are required",
                    success: false,
                },
                { status: 400 }
            );
        } else {
            const user = await User.findOne({ email });

            if (!user) {
                return NextResponse.json(
                    {
                        message: "User not found",
                        success: false,
                    },
                    { status: 404 }
                );
            } else if (await bcrypt.compare(password, user.password)) {
                // check if user already has an existing tokens
                const existingTokenList = await Token.find({
                    userId: user._id,
                });
                console.log(existingTokenList);

                if (existingTokenList.length > 0) {
                    existingTokenList.forEach(async (token) => {
                        await token.updateOne({ revoked: true });
                    });
                }

                // create and saving token in database
                const authenticationToken = getNewToken({
                    type: "authentication",
                    data: {
                        _id: user._id,
                        email: user.email,
                        password: user.password,
                    },
                });
                const accessToken = getNewToken({
                    type: "access",
                    data: {
                        _id: user._id,
                        authenticationToken: authenticationToken,
                    },
                });

                const refreshToken = getNewToken({
                    type: "recovery",
                    data: {
                        _id: user._id,
                        authenticationToken: authenticationToken,
                    },
                });

                await createToken({
                    userId: user._id,
                    token: authenticationToken!,
                    type: "authentication",
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });

                await createToken({
                    userId: user._id,
                    token: accessToken!,
                    type: "access",
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });

                await createToken({
                    userId: user._id,
                    token: refreshToken!,
                    type: "refresh",
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });

                const response = NextResponse.json(
                    {
                        message: "Login successful",
                        success: true,
                    },
                    { status: 200 }
                );

                response.cookies.set({
                    name: "authenticationToken",
                    value: authenticationToken,
                    maxAge: 60 * 60,
                    httpOnly: true,
                });

                response.cookies.set({
                    name: "accessToken",
                    value: accessToken,
                    maxAge: 24 * 60 * 60,
                    httpOnly: true,
                });

                response.cookies.set({
                    name: "refreshToken",
                    value: refreshToken,
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                });

                return response;
            } else {
                return NextResponse.json(
                    {
                        message: "Invalid credentials",
                        success: false,
                    },
                    { status: 401 }
                );
            }

            // Todo: check user is verified
            // else if (!user.verified) {
            //     return NextResponse.json(
            //         {
            //             message: "Please verify your email",
            //             success: false,
            //         },
            //         { status: 401 }
            //     );
            // }
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
