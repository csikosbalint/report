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
            <div className="w-full h-full">
                {children}
            </div>
            <div className="prose justify-center w-[calc(100%)-2rem] flex flex-col items-center">
                <div>Hírdetés</div>
            </div>
        </>
    )
}