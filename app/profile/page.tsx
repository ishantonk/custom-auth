"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        setUserDetails(getUserData());
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get("/api/auth/user");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUserVerification = async () => {
        try {
            const response = await axios.get("/api/auth/verify");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <p>This is the profile page.</p>

            <p>{JSON.stringify(userDetails)}</p>

            <button onClick={handleLogout}>Logout here</button>
        </div>
    );
}
