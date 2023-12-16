"use client";

import { useEffect, useState } from "react";

interface SpinnerProps {
    loading?: boolean;
    color?: string;
    size?: "sm" | "md" | "lg";
}

const Spinner: React.FC<SpinnerProps> = ({
    loading = false,
    color = "white",
    size = "md",
}) => {
    const [load, setLoad] = useState(loading);

    const getColorClass = (color: string) => {
        switch (color) {
            case "white":
                return {
                    circleColor: "border-white/50",
                    spinColor: "border-l-white",
                };
            case "black":
                return {
                    circleColor: "border-black/50",
                    spinColor: "border-l-black",
                };
            default:
                return {
                    circleColor: "border-" + color + "-200",
                    spinColor: "border-l-" + color + "-500",
                };
        }
    };

    useEffect(() => {
        setLoad(loading);
    }, [loading]);

    return (
        load && (
            <div
                className={`block rounded-full border-2 ${
                    size === "sm"
                        ? "w-4 h-4"
                        : size === "md"
                        ? "w-6 h-6"
                        : "w-8 h-8"
                } ${loading ? "animate-spin" : ""} ${
                    getColorClass(color).circleColor
                } ${getColorClass(color).spinColor }`}
            ></div>
        )
    );
};

export default Spinner;
