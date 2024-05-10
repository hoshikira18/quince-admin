"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Users} from "lucide-react";
import {useAdminDeleteSession} from "medusa-react";
import {useRouter} from "next/navigation";

const LogoutButton = () => {
    const router = useRouter()
    const adminLogout = useAdminDeleteSession()
    const handleLogout = () => {
        adminLogout.mutate(undefined, {
            onSuccess: () => {
                router.push("/login")
                console.log("Logout success!")
            }
        })
    }

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <div
                className={`group flex h-8 w-8 bg-white rounded-full border mx-5 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary md:h-8 md:w-8 md:text-base cursor-pointer`}>
                <Users className="h-4 w-4 transition-all group-hover:scale-110"/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                <div onClick={handleLogout} className={`text-sm font-normal cursor-pointer`}>Đăng xuất</div>
            </DropdownMenuLabel>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default LogoutButton;