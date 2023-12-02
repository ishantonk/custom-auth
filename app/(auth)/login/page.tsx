"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormDataProps {
    email: string;
    password: string;
}

const initialFormData: FormDataProps = {
    email: "",
    password: "",
};

const LoginPage = () => {
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
            const { email, password } = formData;
            const response = await axios.post("/api/login", {
                email,
                password,
            });
            if (response.status === 200) {
                router.push("/");
            } else {
                setError("Login failed");
            }
        } catch (error) {
            setError("Login failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section>
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
                    <button disabled={loading} name="login" type="submit">Login</button>
                </div>
            </form>
            <p>
                Don&apos;t have an account? <Link href="/signup">Signup</Link>
            </p>
        </section>
    );
};

export default LoginPage;
