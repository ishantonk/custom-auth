"use client";

interface TextInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    autofocus?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    id = "text_input",
    name,
    placeholder = "Enter your text here",
    label = placeholder,
    value,
    error,
    onChange,
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
                className={`block px-2 py-1.5 font-normal w-full transition rounded outline-none appearance-none backdrop-blur-sm bg-white bg-opacity-50 text-neutral-700 ring-1 ring-neutral-200 focus:ring-blue-500 ${
                    error ? " ring-red-500" : ""
                } placeholder:text-sm placeholder:font-light disabled:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed read-only:ring-green-400 read-only:cursor-not-allowed`}
            />
            {error && (
                <p className="absolute bottom-0 text-[.65rem] font-normal mt-0.5 text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;
