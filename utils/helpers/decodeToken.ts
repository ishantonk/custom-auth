import jwt from "jsonwebtoken";

const decodeToken = (encodedToken: string) => {
    try {
        if (!encodedToken) {
            throw new Error("Token not found");
        } else {
            const decodedToken: any = jwt.verify(
                encodedToken,
                process.env.JWT_SECRET!
            );
            return decodedToken;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default decodeToken;
