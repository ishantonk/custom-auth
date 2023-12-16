"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PassInput, SimpleButton } from "../components";

interface formDataProps {
    password: string;
    confirmPassword: string;
}

const initialFormData: formDataProps = {
    password: "",
    confirmPassword: "",
};

interface ErrorProps {
    password: string;
    confirmPassword: string;
}

const initialError: ErrorProps = {
    password: "",
    confirmPassword: "",
};

const ChangePasswordPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(initialError);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password === "") {
            setError({
                ...error,
                password: "Password is required",
            });
            return;
        } else if (formData.confirmPassword === "") {
            setError({
                ...error,
                confirmPassword: "Confirm password is required",
            });
            return;
        }

        try {
            setLoading(true);
            const { password, confirmPassword } = formData;
            if (password !== confirmPassword) {
                setError({
                    ...error,
                    password: "Passwords do not match",
                    confirmPassword: "Passwords do not match",
                });
                return;
            } else {
                const searchParams = new URLSearchParams(
                    window.location.search
                );
                const token = searchParams.get("token");
                if (!token) {
                    console.log("Token not found"); // todo: add toast message
                    return;
                }

                const response = await axios.post(
                    "/api/account/change-password",
                    { password, token }
                );
                if (response.status === 200) {
                    setSuccess(true);
                    console.log("success");
                } else {
                    console.log("Something went wrong"); // todo: add toast message
                }
            }
        } catch (error) {
            console.log("Something went wrong"); // todo: add toast message
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-2xl font-semibold text-neutral-700 mb-2 text-center">
                Change Password
            </h1>
            <p className="text-neutral-700 mb-8 text-center">
                Hey, enter your new password for your account.
            </p>
            <form
                action="/api/account/change-password"
                method="post"
                onSubmit={handleSubmit}
            >
                <PassInput
                    id="signup-password-input"
                    name="password"
                    placeholder="Your password"
                    label="Password"
                    value={formData.password}
                    error={error.password}
                    onChange={handleChange}
                    icon
                />
                <PassInput
                    id="signup-password-input"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    label="Confirm password"
                    value={formData.confirmPassword}
                    error={error.confirmPassword}
                    onChange={handleChange}
                    icon
                />
                <div className="my-4">
                    <SimpleButton Label="Change password" wFull />
                </div>
            </form>
        </section>
    );
};

export default ChangePasswordPage;
