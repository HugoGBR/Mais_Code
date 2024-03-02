import SideBar from "@/components/Sidebar";
import BtnVoltar from "@/components/BtnVoltar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row">
            <div className="h-screen relative flex flex-row gap-6">
                <div>
                    <SideBar/>
                </div>
            </div>
            <main className="flex flex-col items-center justify-center w-full bg-[#F2F6F9]">
                {children}
            </main>
        </div>
    );
}