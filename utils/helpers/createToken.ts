import type { tokenType } from "@/utils/types";
import connect from "@/utils/config/database";
import Token from "@/app/models/tokenModel";

const createToken = async ({
    userId,
    token,
    type,
    expiry,
    ipAddress,
    clientInfo,
}: {
    userId: String;
    token: String;
    type: tokenType["type"];
    expiry?: Date;
    ipAddress?: String;
    clientInfo?: String | null;
}) => {
    connect(); // connect to database

    try {
        if (!userId || !token || !type) {
            throw new Error("All fields are required");
        } else {
            switch (type) {
                case "authentication":
                    const authenticationToken = new Token({
                        userId,
                        token,
                        type,
                        ipAddress,
                        clientInfo,
                        expiresAt:
                            expiry || new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                    });
                    return await authenticationToken.save();
                case "access":
                    const accessToken = new Token({
                        userId,
                        token,
                        type,
                        ipAddress,
                        clientInfo,
                        expiresAt:
                            expiry ||
                            new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                    });
                    return await accessToken.save();
                case "refresh":
                    const refreshToken = new Token({
                        userId,
                        token,
                        type,
                        ipAddress,
                        clientInfo,
                        expiresAt:
                            expiry ||
                            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                    });
                    return await refreshToken.save();
                case "recovery":
                    const recoveryToken = new Token({
                        userId,
                        token,
                        type,
                        ipAddress,
                        clientInfo,
                        expiresAt:
                            expiry || new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
                    });
                    return await recoveryToken.save();
                default:
                    return new Error("Invalid token type");
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Something went wrong");
        }
    }
};

export default createToken;
