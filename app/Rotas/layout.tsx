import SideBar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen relative">
            <div className="hidden h-full  md:flex flex-col md:fixed md:col-auto bg-gray-900">
                <div>    
                <SideBar/>
                </div>
            </div>
            <main className="flex items-center justify-center">
                {children}
            </main>
        </div>
    );
}
