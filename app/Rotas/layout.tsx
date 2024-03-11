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

            <main className="flex flex-col p-10 w-full">
                <div className="w-full">
                    <BtnVoltar/>
                </div>
                <div className="flex justify-center items-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
