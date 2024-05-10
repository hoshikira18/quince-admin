"use client"

import {Card} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useAdminLogin} from "medusa-react";
import {useRouter} from "next/navigation";

const Login = () => {
    const router = useRouter()
    const adminLogin = useAdminLogin()

    const form = useForm({
        defaultValues: {
            email: "admin@medusa-test.com", password: "supersecret"
        }
    })

    const handleLogin = (data) => {
        adminLogin.mutate(data, {
            onSuccess: ({ user }) => {
                router.push("/")
                console.log("Login success!")
            }
        })
    }

    return <div className={`h-screen flex items-center`}><Card
        className={`w-[400px] mx-auto col-span-12 md:col-span-6 lg:col-span-4 md:col-start-4 lg:col-start-5 p-3 md:p-8 transition-all duration-500`}>
        <h1 className={`text-2xl font-bold mb-2`}>Đăng nhập</h1>
        <form action="" onSubmit={form.handleSubmit(data => handleLogin(data))}>
            <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id={`email`}
                       className={`w-full transition-all duration-500`} {...form.register("email")} />
            </div>
            <div className={`mt-5`}>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input type="password" id={`password`}
                       className={`w-full transition-all duration-500`} {...form.register("password")} />
            </div>
            <div className={`mt-5`}>
                <Button type={`submit`} className={`w-full transition-all duration-500`}>Đăng nhập</Button>
            </div>
        </form>
    </Card>
    </div>
}

export default Login