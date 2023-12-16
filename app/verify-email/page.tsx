"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Spinner } from "../components";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get("token");
        if (token) {
            setToken(token);
        } else {
            setError("Token not found");
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        if (token) {
            setLoading(true);
            const verifyEmail = async () => {
                try {
                    const response = await axios.post("/api/account/verify", {
                        token,
                    });

                    if (response.status === 200) {
                        setSuccess(true);
                        router.push("/login");
                    } else {
                        setError("Verification failed");
                    }
                } catch (error) {
                    setError("Verification failed");
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            verifyEmail();
        }
    }, [token, router]);

    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-2xl font-semibold text-neutral-700 mb-2 text-center">
                Verifying your email.
            </h1>
            <div className="flex flex-row items-center justify-center my-4">
                {loading && <Spinner loading={loading} />}
            </div>

            {error && (
                <p className="text-neutral-700 mb-8 text-center">{error}</p>
            )}

            {success && (
                <p className="text-neutral-700 text-center">
                    Your email has been verified. You can now login.
                    <br />
                    Now we are redirecting you to login page.
                </p>
            )}
            <div className="my-4 text-center">
                Go back to sign in page{" "}
                <Link
                    href={"/login"}
                    className="text-blue-500 text-lg font-semibold"
                >
                    Login here
                </Link>
            </div>
        </section>
    );
}
