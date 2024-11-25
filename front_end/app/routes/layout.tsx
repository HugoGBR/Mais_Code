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
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-[#F2F6F9]">
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
            <main className="flex-grow p-6 lg:container lg:mx-auto md:p-10">
                {children}
            </main>
        </div>
    );
}
