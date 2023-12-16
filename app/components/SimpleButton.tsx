"use client";

import { Spinner } from ".";

const SimpleButton = ({
    wFull,
    Label,
    loading,
    onClick,
}: {
    wFull?: boolean;
    Label: string;
    loading?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    return (
        <button
            className={`relative bg-blue-500 text-white py-2 px-1.5 rounded hover:bg-blue-700 transition inline-flex flex-row items-center justify-center shrink-0${
                wFull ? " w-full" : ""
            }`}
        >
            {Label}
            <div className="absolute right-8">
                <Spinner loading={loading} color="white" size="sm" />
            </div>
        </button>
    );
};

export default SimpleButton;
