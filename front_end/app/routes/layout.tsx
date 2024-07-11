"use client"
import SideBar from "@/components/Sidebar";
import { HambuguerMenu } from "@/components/HambuguerMenu";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isHome = pathname === '/routes/home';

    return (
        <div className="md:flex md:flex-row min-h-screen w-full bg-[#F2F6F9]">
            <div className="md:h-full md:relative md:flex-row gap-6">
                <div className="md:hidden">
                    <HambuguerMenu />
                </div>
                <div className="hidden md:flex md:flex-row">
                    <SideBar />
                </div>
            </div>

            <main className="container md:mx-auto p-10">
                <div className="flex min-h-full justify-center items-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
