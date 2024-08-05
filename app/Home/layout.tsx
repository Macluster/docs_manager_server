import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import SideBar from "./Components/SideBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="flex flex-col w-[100vw] h-[100vh]">
            <body className="w-100 h-[100%] bg-slate-400">

                <div className="flex flex-row h-[100%] ">
                    <SideBar/>
                    <div className=" flex flex-col w-[80%] h-100">
                        <div className="w-[100%] h-[50px] ">

                        </div>
                        <div >{children}</div>
                    </div>
                </div>

            </body>
        </html>
    );
}



