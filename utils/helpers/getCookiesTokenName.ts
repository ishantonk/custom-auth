import { tokenType } from "@/utils/types";

const getCookiesTokenName = (type: tokenType["type"]) => {
    switch (type) {
        case "authentication":
            return "authenticationToken";
        case "access":
            return "accessToken";
        case "refresh":
            return "refreshToken";
        case "recovery":
            return "recoveryToken";
    }
};

export default getCookiesTokenName;
