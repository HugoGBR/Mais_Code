import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./Sidebar";

export default function MobileSideBar() {


    return (
        <>
            <button className="md:hidden">
                <Menu />
            </button>
        </>
    )
}