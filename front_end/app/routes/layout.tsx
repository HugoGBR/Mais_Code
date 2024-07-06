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
        <div className="md:flex h-screen w-full bg-[#F2F6F9]">
            <div className="md:h-full md:relative flex md:flex-row gap-6">
                <div className="md:hidden">
                    <HambuguerMenu />
                </div>
                <div className="hidden md:flex md:flex-row">
                    <SideBar />
                </div>
            </div>

            <main className="flex-1 container mx-auto sm:overflow-y-auto">
                <div className="w-full">
                    {!isHome && <BtnVoltar />}
                </div>
                <div className="flex h-full justify-center items-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
