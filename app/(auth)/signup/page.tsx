"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    EmailInput,
    PassInput,
    SimpleButton,
    TextInput,
} from "@/app/components";

interface FormDataProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const initialFormData: FormDataProps = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

interface ErrorProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const initialError: ErrorProps = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignupPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(initialError);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.name === "") {
            setError({
                ...error,
                name: "Name is required",
            });
            return;
        } else if (formData.email === "") {
            setError({
                ...error,
                email: "Email is required",
            });
            return;
        } else if (formData.password === "") {
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
            const { name, email, password, confirmPassword } = formData;
            if (password !== confirmPassword) {
                setError({
                    ...error,
                    password: "Passwords do not match",
                    confirmPassword: "Passwords do not match",
                });
                return;
            } else {
                const response = await axios.post("/api/account/signup", {
                    name,
                    email,
                    password,
                });
                if (response.status === 201) {
                    router.push("/login");
                } else {
                    console.log("Something went wrong"); // todo: add toast message
                }
            }
        } catch (error) {
            console.log("Something went wrong"); // todo: add toast message
            console.log(error);
        } finally {
            setLoading(false);
            console.log("error", error);
        }
    };
    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-2xl font-semibold text-neutral-700 mb-2 text-center">
                Create Account
            </h1>
            <p className="text-neutral-700 mb-8 text-center">
                Hey, enter your details to create your new account
            </p>
            <form
                action="/api/account/signup"
                method="post"
                onSubmit={handleSubmit}
            >
                <TextInput
                    id="signup-name-input"
                    name="name"
                    placeholder="Your full name"
                    label="Full name"
                    value={formData.name}
                    error={error.name}
                    onChange={handleChange}
                />
                <EmailInput
                    id="signup-email-input"
                    name="email"
                    placeholder="Your email address"
                    label="Email"
                    value={formData.email}
                    error={error.email}
                    onChange={handleChange}
                    icon
                />
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
                    <SimpleButton Label="Create account" wFull />
                </div>
            </form>
            <p className="text-sm text-neutral-700 mb-1 mt-4 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                    Login now
                </Link>
            </p>
        </section>
    );
};

export default SignupPage;
