'use client'

import { useEffect } from "react"

export default function AdUnit({ adSlot, adFormat = "auto", adLayout = "", adLayoutKey, className }) {
    useEffect(() => {
        try {
            (window).adsbygoogle = (window).adsbygoogle || [];
            (window).adsbygoogle.push({});
        } catch (e) {
            console.error('Error loading ads:', e);
        }
    }, []);
    return (
        <div className='w-full h-full'>
            <ins className='adsbygoogle h-[calc(100%-1rem)] w-full flex justify-center items-center ${className}'
                data-ad-client="ca-pub-8712767354684493"
                data-ad-slot={adSlot}
                data-ad-layout={adLayout}
                data-ad-layout-key={adLayoutKey}
                data-ad-format={adFormat}
                data-full-width-responsive="true">
            </ins>
            <div className="prose h-[1rem] justify-center w-full flex flex-col items-center">
                <div className="text-xs">Hírdetés</div>
            </div>
        </div>
    )
}