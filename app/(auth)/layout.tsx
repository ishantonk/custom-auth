"use client";

import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex flex-row flex-1 bg-neutral-100">
            <div className="hidden md:flex flex-col md:flex-[2] lg:flex-[3] justify-center relative z-10">
                <div className="absolute inset-0 -z-10 flex flex-row justify-center items-center">
                    <Image
                        src={"/login-bg.svg"}
                        alt="login background"
                        width={500}
                        height={500}
                        className="object-cover object-center opacity-50 blur-sm"
                    />
                </div>
                <div className="pb-2 px-4 mb-16 mx-4 space-y-4">
                    <p className="text-neutral-700 font-normal text-lg">
                        <span className="text-3xl">Custom-Auth</span> is a
                        simple authentication system. It is built with Next.js,
                        Tailwind, MongoDB and Mongoose. It&apos;s designed to
                        use or integrate with any React or Next.js project and
                        it also open source.
                    </p>
                </div>
            </div>
            <div className="flex flex-col flex-[2] justify-center m-8">
                {children}
            </div>
        </main>
    );
}
