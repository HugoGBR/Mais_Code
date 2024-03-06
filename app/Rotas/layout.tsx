import SideBar from "@/components/Sidebar";
import BtnVoltar from "@/components/BtnVoltar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row h-screen">
            <div className="h-screen relative hidden md:flex md:flex-row gap-6">
                <div>
                    <SideBar/>
                </div>
            </div>
            <main className="flex flex-col items-center p-10 justify-center w-full bg-[#F2F6F9]">
                {children}
            </main>
        </div>
    );
}
