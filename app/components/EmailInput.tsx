"use client";

import { AtSign } from "lucide-react";

interface EmailInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    autofocus?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    id = "Email_input",
    name,
    placeholder = "Enter your email here",
    label = placeholder,
    value,
    error,
    onChange,
    icon,
    disabled,
    readonly,
    required,
    autofocus,
}) => {
    return (
        <div className="flex flex-col relative pb-4">
            <label
                htmlFor={id}
                className="text-sm font-normal text-neutral-700 mb-0.5"
            >
                {label}
            </label>
            <div
                className={`flex flex-row items-center px-1 py-1.5 transition rounded backdrop-blur-sm bg-white bg-opacity-50 ring-1 ring-neutral-200 focus-within:ring-blue-500 ${
                    error ? " ring-red-500" : ""
                } ${
                    disabled
                        ? "ring-slate-400 opacity-50 cursor-not-allowed"
                        : ""
                } ${readonly ? "ring-green-400 cursor-not-allowed" : ""}`}
            >
                <input
                    type="text"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readonly}
                    required={required}
                    autoFocus={autofocus}
                    aria-label={`${name ? name : "Text"} input field`}
                    className="mx-1 font-normal w-full outline-none appearance-none bg-transparent text-neutral-700 placeholder:text-sm placeholder:font-light"
                />
                {icon && (
                    <AtSign
                        size={18}
                        className="flex flex-col items-center justify-center mx-1.5 text-neutral-700"
                    />
                )}
            </div>
            {error && (
                <p className="absolute bottom-0 text-[.65rem] font-normal mt-0.5 text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default EmailInput;
