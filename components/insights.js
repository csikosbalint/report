'use client'
import { injectContentsquareScript } from '@contentsquare/tag-sdk';
import { useEffect } from 'react';

export default function Insights() {
    useEffect(() => {
        injectContentsquareScript({
            siteId: process.env.NEXT_PUBLIC_SITE_ID,
            async: true, // Optional: Set to false to wait for script execution until after document parsing.
            defer: false // Optional: Set to true to defer script execution after document parsing.
        });
    }, [])
    return null
}