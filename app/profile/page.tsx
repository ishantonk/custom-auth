"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SimpleButton } from "../components";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        createdAt: "",
        verified: "",
    });

    useEffect(() => {
        axios
            .get("/api/account/user")
            .then((res) =>
                setUserDetails({
                    name: res.data!.data!.name,
                    email: res.data!.data!.email,
                    createdAt: res.data!.data!.createdAt,
                    verified: res.data!.data!.verified,
                })
            )
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("/api/account/logout");
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex flex-col justify-center w-full max-w-md mx-auto p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h1 className="text-3xl font-semibold text-neutral-700 mb-4 text-center">
                Your profile
            </h1>
            <h2 className="text-xl text-neutral-700 mb-2 font-mono">
                User Details
            </h2>
            <p className="text-neutral-500 text-lg mb-1">
                Name:{" "}
                <span className="text-green-500">
                    {userDetails.name.charAt(0).toUpperCase() +
                        userDetails.name.slice(1)}
                </span>
            </p>
            <p className="text-neutral-500 text-lg mb-1">
                Email:{" "}
                <span className="text-green-500">{userDetails.email}</span>
            </p>
            <p className="text-neutral-500 text-lg mb-1">
                Created At:{" "}
                <span className="text-green-500">
                    {new Date(userDetails.createdAt).toDateString()}
                </span>
            </p>
            <p className="text-neutral-500 text-lg mb-1">
                Verified:{" "}
                <span
                    className={`text-${
                        userDetails.verified ? "green" : "red"
                    }-500`}
                >
                    {userDetails.verified.toString()}
                </span>
            </p>
            <Link
                href={"/"}
                className="text-blue-500 text-lg font-light mt-2 text-center hover:text-blue-700"
            >
                Go to home page
            </Link>
            <div className="mt-4 mb-2">
                <SimpleButton
                    Label="Logout here"
                    onClick={handleLogout}
                    wFull
                />
            </div>
        </section>
    );
}
