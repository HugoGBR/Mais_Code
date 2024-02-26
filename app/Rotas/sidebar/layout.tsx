import SideBar from "@/components/Sidebar";
import Navbar from "@/components/navabar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex flex-col md:fixed col-auto bg-gray-900">
                <div>
                <SideBar/>
                </div>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
            </main>

        </div>
    );
}
