'use client'

import { useEffect, useState } from "react"

export default function AdUnit({ adSlot, adFormat = "auto", adLayout = "", adLayoutKey, className }) {
    const [hidden, setHidden] = useState(false)
    useEffect(() => {
        try {
            (window).adsbygoogle = (window).adsbygoogle || [];
            (window).adsbygoogle.push({});
        } catch (e) {
            console.error('Error loading ads:', e);
            setHidden(true)
        }
    }, [setHidden]);
    return (
        <>
            <div className={`w-full h-full ${hidden && 'hidden'}`}>
                <ins className={`adsbygoogle h-[calc(100%-1rem)] w-full flex justify-center items-center ${className}`}
                    data-ad-client="ca-pub-8712767354684493"
                    data-ad-slot={adSlot}
                    data-ad-layout={adLayout}
                    data-ad-layout-key={adLayoutKey}
                    data-ad-format={adFormat}
                    data-full-width-responsive="true">
                </ins>
                <div className="prose h-[1rem] justify-center w-full flex flex-col items-center">
                    <div className="text-xs">Hírdetés</div>
                    <div className="hidden">({adSlot})</div>
                </div>
            </div>
        </>
    )
}