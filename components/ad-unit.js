'use client'

import { useEffect } from "react"

export default function AdUnit({ adSlot, adFormat = "auto", adLayout = ""}) {
    useEffect(() => {
        try {
          (window).adsbygoogle = (window).adsbygoogle || [];
          (window).adsbygoogle.push({});
        } catch (e) {
          console.error('Error loading ads:', e);
        }
      }, []);
    return (
        <>
            <div className="w-full h-[calc(100%)-2rem]">
                <ins className="adsbygoogle h-full w-full flex justify-center items-center"
                    data-ad-client="ca-pub-8712767354684493"
                    data-ad-slot={adSlot}
                    data-ad-format={adFormat}
                    data-ad-layout={adLayout}
                    data-full-width-responsive="true">
                </ins>
            </div>
            <div className="prose justify-center w-full flex flex-col items-center">
                <div>Hírdetés</div>
                <div className="hidden">({adSlot})</div>
            </div>
        </>
    )
}