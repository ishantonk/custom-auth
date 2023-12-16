"use client";

export default function ChangePassLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col min-h-screen justify-center items-center">
            {children}
        </main>
    );
}
