"use client"
import Navigation from "@/components/layout/navigation";
import LogoutButton from "@/components/layout/logout-button";
import {useAdminGetSession} from "medusa-react";

const Layout = ({children}) => {
    const { user, isLoading } = useAdminGetSession()
    if (!isLoading && !user) {
        window.location.href = "/login"
    }
    return (<div className={`grid grid-cols-12`}>
            <div className={`col-span-4 md:col-span-3 lg:col-span-2`}>
                <Navigation/>
            </div>
            <div className={`bg-[#fbfbfb] col-span-8 md:col-span-9 lg:col-span-10`}>
                <div
                    className={`bg-[#fbfbfb] sticky top-0 flex items-center justify-end space-x-2 py-3 font-medium text-primary border-b`}>
                    <LogoutButton />
                </div>
                    <div className={`p-5`}>
                        {children}
                    </div>
            </div>
        </div>);
}

export default Layout;