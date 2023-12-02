import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/app/models/userModels";
import Token from "@/app/models/tokenModel";
import connect from "@/utils/config/database";

export async function POST(request: NextRequest) {
    connect(); // connect to database

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
                // save authentication token in database
                const authenticationTokenData = {
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                };

                const authenticationToken = jwt.sign(
                    authenticationTokenData,
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "1d",
                    }
                );

                const newAuthenticationToken = new Token({
                    userId: user._id,
                    token: authenticationToken,
                    type: "authentication",
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });
                await newAuthenticationToken.save();

                // save access token in database
                const accessTokenData = {
                    _id: user._id,
                    authenticationToken: authenticationToken,
                };
                const accessToken = jwt.sign(
                    accessTokenData,
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "1d",
                    }
                );

                const newAccessToken = new Token({
                    userId: user._id,
                    token: accessToken,
                    type: "access",
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });
                await newAccessToken.save();

                // save refresh token in database
                const refreshTokenData = {
                    _id: user._id,
                    authenticationToken: authenticationToken,
                };
                const refreshToken = jwt.sign(
                    refreshTokenData,
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "7d",
                    }
                );

                const newRefreshToken = new Token({
                    userId: user._id,
                    token: refreshToken,
                    type: "refresh",
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    ipAddress: request.ip,
                    clientInfo: request.headers.get("User-Agent"),
                });
                await newRefreshToken.save();

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
                    maxAge: 24 * 60 * 60,
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
