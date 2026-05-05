"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";

export default function PublicChrome({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isLogin = pathname === "/login";

    if (isAdmin) {
        return <>{children}</>;
    }

    if (isLogin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main style={{ minHeight: "60vh" }}>{children}</main>
            <Footer />
            <CartSidebar />
        </>
    );
}
