"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

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
        <section>
            <h1>Forget Password</h1>
            {loading && <p>Please wait your request is being processed.</p>}
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {(success && <p>Check your email to reset your password.</p>) || (
                <p>{error}</p>
            )}
            <p>
                Remember your password? <Link href="/login">Login</Link>
            </p>
        </section>
    );
}
