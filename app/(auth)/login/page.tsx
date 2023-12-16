"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PassInput, EmailInput, SimpleButton } from "@/app/components";

interface FormDataProps {
    email: string;
    password: string;
}

const initialFormData: FormDataProps = {
    email: "",
    password: "",
};

interface ErrorProps {
    email: string;
    password: string;
}

const initialError: ErrorProps = {
    email: "",
    password: "",
};

const LoginPage = () => {
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

        if (formData.email === "") {
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
        }

        try {
            setLoading(true);
            const { email, password } = formData;
            const response = await axios.post("/api/account/login", {
                email,
                password,
            });
            if (response.status === 200) {
                router.push("/");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.log("Login failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-2xl font-semibold text-neutral-700 mb-2 text-center">
                Login
            </h1>
            <p className="text-neutral-700 mb-8 text-center">
                Hey, enter your details to get sign in to your account
            </p>
            <form
                action="/api/account/login"
                method="post"
                onSubmit={handleSubmit}
            >
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
                <p className="text-sm text-neutral-700 mb-1">
                    Having trouble in sign in?{" "}
                    <Link href="/forget-password" className="text-blue-500">
                        Forget password
                    </Link>
                </p>
                <div className="my-4">
                    <SimpleButton Label="Login here" wFull loading={loading} />
                </div>
            </form>
            <p className="text-sm text-neutral-700 mb-1 mt-4 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500">
                    Signup now
                </Link>
            </p>
        </section>
    );
};

export default LoginPage;
