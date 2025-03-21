'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react"

export default function AdUnit({ children }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        try {
            window.onload = function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error(err);
        }
    }, [pathname, searchParams, children]);
    return (
        <>
            {children}
            <div className="prose justify-center w-full flex flex-col items-center">
                <div>Hírdetés</div>
            </div>
        </>
    )
}