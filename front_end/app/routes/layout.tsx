"use client";
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
        <div className="flex flex-col min-h-screen md:flex-row w-full bg-[#F2F6F9] overflow-hidden">
            {/* Sidebar com breakpoints */}
            <div className="flex-shrink-0">
                <div className="md:hidden">
                    <HambuguerMenu />
                </div>
                <div className="hidden md:flex">
                    <SideBar />
                </div>
            </div>

            {/* Conteúdo principal */}
            <main className="flex items-center justify-center w-full p-6 md:p-5 lg:px-8">
                {children}
            </main>
        </div>
    );
}
