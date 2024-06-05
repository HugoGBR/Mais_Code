"use client"
import SideBar from "@/components/Sidebar";
import BtnVoltar from "@/components/BtnVoltar";
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
        <div className="md:flex md:flex-row h-screen w-full bg-[#F2F6F9]">
            <div className="md:h-screen md:relative md:flex-row gap-6">
                <div className="md:hidden">
                    <HambuguerMenu />
                </div>
                <div className="hidden md:flex md:flex-row">
                    <SideBar />
                </div>
            </div>

            <main className="flex flex-col p-10 w-full">
                <div className="w-full">
                    {!isHome && <BtnVoltar />}
                </div>
                <div className="flex md:h-screen w-full md:justify-center md:items-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
