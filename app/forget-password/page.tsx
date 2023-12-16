"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EmailInput, SimpleButton } from "../components";

interface formDataProps {
    email: string;
}

const initialFormData: formDataProps = {
    email: "",
};

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.email === "") {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);
            const { email } = formData;
            const response = await axios.post("/api/account/recovery", {
                email,
            });
            if (response.status === 200) {
                setSuccess(true);
                console.log("success");
            } else {
                setError("Something went wrong");
            }
        } catch (error) {
            setError("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-2xl font-semibold text-neutral-700 mb-2 text-center">
                Forget Password
            </h1>
            <p className="text-neutral-700 mb-8 text-center">
                Hey, enter your registered email to reset your password.
            </p>
            <form
                action="/api/account/recovery"
                method="post"
                onSubmit={handleSubmit}
            >
                <EmailInput
                    id="signup-email-input"
                    name="email"
                    placeholder="Your email address"
                    label="Email"
                    value={formData.email}
                    error={error}
                    onChange={handleChange}
                    icon
                />
                <div className="my-4">
                    <SimpleButton Label="Reset password" wFull />
                </div>
            </form>
            <p className="text-sm text-neutral-700 mb-1 mt-4 text-center">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-500">
                    Login
                </Link>
            </p>
        </section>
    );
}
