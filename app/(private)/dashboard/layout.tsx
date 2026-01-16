import type { Metadata } from "next";
import Header from "./_components/Header";
import Navigation from "./_components/Navbar/Navigation";

export const metadata: Metadata = {
    title: "Home",
    description: "FeedbackHub",
    keywords: ['feedback', 'comments']
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="lg:w-1/2 my-0 mx-auto lg:mx-2 py-20 px-10">
            <Header />
            <Navigation />

            <main className="min-h-[60vh]">
                {children}
            </main>
        </div>
    );
}