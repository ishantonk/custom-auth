"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

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

const SignupPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
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
            const { name, email, password, confirmPassword } = formData;
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            } else {
                const response = await axios.post("/api/auth/signup", {
                    name,
                    email,
                    password,
                });
                if (response.status === 201) {
                    router.push("/login");
                } else {
                    setError("Something went wrong");
                }
            }
        } catch (error) {
            setError("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
            console.log("error", error);
        }
    };
    return (
        <section>
            <form action="" method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
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
                <button name="submit" type="submit">
                    SignUp here
                </button>
            </form>
            <p>
                Already have an account? <Link href="/login">Login</Link>
            </p>
        </section>
    );
};

export default SignupPage;
