"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

interface FormDataProps {
    email: string;
    password: string;
}

const initialFormData: FormDataProps = {
    email: "",
    password: "",
};

const LoginPage = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formData;

        // Todo: Add validation and error handling and response and redirect
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
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>
                Don&apos;t have an account? <Link href="/signup">Signup</Link>
            </p>
        </section>
    );
};

export default LoginPage;
