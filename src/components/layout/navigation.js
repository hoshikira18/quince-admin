"use client"
import {
    Package,
    Package2,
    Home,
    ShoppingCart
} from 'lucide-react';
import {usePathname} from "next/navigation";
import Link from "next/link";
import {memo} from "react";

const navItem = [
    {
        title: "Đơn hàng",
        icon: ShoppingCart,
        path: "/orders",
    },
    {
        title: "Dashboard",
        icon: Home,
        path: "/",
    },
    {
        title: "Sản phẩm",
        icon: Package,
        path: "/products",
    },
    {
        title: "Bộ sưu tập",
        icon: Package2,
        path: "/collections",
    },
    {
        title: "Danh mục",
        icon: Package2,
        path: "/categories",
    },
    {
        title: "Vùng",
        icon: Package2,
        path: "/regions",
    },
    {
        title: "Phương thức giao hàng",
        icon: Package2,
        path: "/shipping-options",
    },
    {
        title: "Quản lý cửa hàng",
        icon: Package2,
        path: "/store",
    }
]

const Navigation = () => {
    const pathname = usePathname()
    return (
        <nav className={`sticky top-0 h-screen border-r px-4 bg-[#fbfbfb]`}>
            <div className={`flex items-center space-x-2  py-3 font-medium text-primary border-b`}>
                <div
                    className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary md:h-8 md:w-8 md:text-base cursor-pointer`}>
                    <Package2 className="h-6 w-6 transition-all group-hover:scale-110"/>
                </div>
                <h1>QP-BED</h1>
            </div>
            <div className={`px-2 space-y-2 py-2`}>
                {
                    navItem.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link href={item.path} key={index}
                                 className={`${pathname.includes(item.path) ? "bg-[#f4f4f5]" : ""} group flex items-center space-x-2 py-2 px-3 text-sm text-primary cursor-pointer rounded-lg`}>
                                <Icon className="h-4 w-4 group-hover:scale-125 transition-all duration-300"/>
                                <h1 className={`transition-all duration-300 group-hover:text-base`}>{item.title}</h1>
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default memo(Navigation)