"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
                    const response = await axios.post("/api/auth/verify", {
                        token,
                    });

                    if (response.status === 200) {
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
        <div>
            <h1>Verify Email</h1>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {!loading && !error && <p>Verifying email...</p>}
            {!loading && !error && <p>Email verified successfully</p>}
            {!loading && !error && <p>Redirecting to login page...</p>}
            <Link href="/login">Login</Link>
        </div>
    );
}
