"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface formDataProps {
    password: string;
    confirmPassword: string;
}

const initialFormData: formDataProps = {
    password: "",
    confirmPassword: "",
};

const ChangePasswordPage = () => {
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
            const { password, confirmPassword } = formData;
            if (!password || !confirmPassword) {
                setError("All fields are required");
                return;
            } else if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            } else {
                const searchParams = new URLSearchParams(
                    window.location.search
                );
                const token = searchParams.get("token");
                if (!token) {
                    setError("Token not found");
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
                    setError("Something went wrong");
                }
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
            <h1>Change Password</h1>
            {loading && <p>Please wait your request is being processed.</p>}
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Change Password</button>
                </div>
            </form>
            {success && <p>Password changed successfully</p>}
            {error && <p>{error}</p>}
        </section>
    );
};

export default ChangePasswordPage;
