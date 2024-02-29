import SideBar from "@/components/Sidebar";

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
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
