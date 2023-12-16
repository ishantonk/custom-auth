"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
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
        <main className="flex min-h-screen flex-col p-4">
            <div className="grid grid-cols-6 gap-4">
                <section className="col-span-4 flex flex-col w-full p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <h1 className="text-2xl font-semibold text-neutral-700 mb-2 font-mono">
                        Custom-Auth authentication system.
                    </h1>
                    <p className="text-neutral-500 text-lg font-light mt-2 mb-4 first-letter:text-2xl">
                        Custom-Auth is a simple authentication system. It is
                        built with Next.js, Tailwind, MongoDB and Mongoose.
                        It&apos;s designed to use or integrate with any React or
                        Next.js project and it also open source.
                    </p>
                </section>
                <aside className="col-span-2 flex flex-col w-full p-4 md:p-6 lg:p-8 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    <h1 className="text-xl font-semibold text-neutral-700 mb-4 font-mono">
                        User Details
                    </h1>
                    <p className="text-neutral-500 text-lg mb-2">
                        Name:{" "}
                        <span className="text-green-500">
                            {userDetails.name.charAt(0).toUpperCase() +
                                userDetails.name.slice(1)}
                        </span>
                    </p>
                    <p className="text-neutral-500 text-lg mb-2">
                        Email:{" "}
                        <span className="text-green-500">
                            {userDetails.email}
                        </span>
                    </p>
                    <p className="text-neutral-500 text-lg mb-2">
                        Created At:{" "}
                        <span className="text-green-500">
                            {new Date(userDetails.createdAt).toDateString()}
                        </span>
                    </p>
                    <p className="text-neutral-500 text-lg mb-2">
                        Verified:{" "}
                        <span
                            className={`text-${
                                userDetails.verified ? "green" : "red"
                            }-500`}
                        >
                            {userDetails.verified.toString()}
                        </span>
                    </p>
                </aside>
            </div>
            <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 my-4 md:rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <h1 className="text-2xl font-semibold text-neutral-700 mb-2 font-mono">
                    Links
                </h1>
                <Link
                    href={"/profile"}
                    className="text-blue-500 text-lg font-light my-1 hover:text-blue-700"
                >
                    Profile
                </Link>
                <Link
                    href={"/change-password"}
                    className="text-blue-500 text-lg font-light my-1 hover:text-blue-700"
                >
                    Reset Password
                </Link>
                {!userDetails.verified && (
                    <Link
                        href={"/verify-email"}
                        className="text-blue-500 text-lg font-light my-1 hover:text-blue-700"
                    >
                        Verify your email
                    </Link>
                )}
                <Link
                    href={"/deactivate-account"}
                    className="text-blue-500 text-lg font-light my-1 hover:text-blue-700"
                >
                    Deactivate your account
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-left text-blue-500 text-lg font-light my-1 hover:text-blue-700"
                >
                    Logout here
                </button>
            </div>
        </main>
    );
}
