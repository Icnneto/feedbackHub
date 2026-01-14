import type { Metadata } from "next";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";

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
        <div className="max-w-6xl my-0 mx-auto py-20 px-10">
            <Header />
            <Navigation />
            {children}
        </div>
    );
}