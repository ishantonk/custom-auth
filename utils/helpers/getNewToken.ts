import jwt from "jsonwebtoken";
import { tokenType } from "@/utils/types";

const getNewToken = ({
    type,
    data,
    lifespan,
}: {
    type: tokenType["type"];
    data: object;
    lifespan?: number;
}) => {
    switch (type) {
        case "authentication":
            return jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: lifespan || "1h",
            });
        case "access":
            return jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: lifespan || "1d",
            });
        case "refresh":
            return jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: lifespan || "7d",
            });
        case "recovery":
            return jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: lifespan || "30m",
            });
        case "verification":
            return jwt.sign(data, process.env.JWT_SECRET!, {
                expiresIn: lifespan || "10m",
            });
        default:
            throw new Error("Invalid token type");
    }
};

export default getNewToken;
