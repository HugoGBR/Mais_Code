import SideBar from "@/components/Sidebar";
import BtnVoltar from "@/components/BtnVoltar";
import {HambuguerMenu} from "@/components/HambuguerMenu";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="md:flex md:flex-row h-screen w-full bg-[#F2F6F9]">
            <div className="md:h-screen md:relative md:flex-row gap-6">
                <div className="md:hidden">
                    <HambuguerMenu/>
                </div>
                <div className="hidden md:flex md:flex-row">
                    <SideBar/>
                </div>
            </div>
            <main className="md:flex md:flex-col items-center p-10 justify-center w-full">
                {children}
            </main>
        </div>
    );
}
