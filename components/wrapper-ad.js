"use client";

import { useEffect, useState } from "react";

export function AdWrapper({ position }) {
  const [ad, setAd] = useState(<>Ad Space ({position})</>);
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAd(
        <>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8712767354684493"
            data-ad-slot="1702336191"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </>
      );
    } catch (err) {
      console.log(err);
    }
  }, [setAd]);

  switch (position) {
    case "right":
  }
  return (
    <div className="w-[var(--ad-width)]">
      <div className="h-[600px] border">
        {ad}
      </div>
    </div>
  );
}
