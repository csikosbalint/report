import { remark } from "remark";
import html from "remark-html";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { createElement } from "react";
import { Fragment, jsxs, jsx } from 'react/jsx-runtime'

import Image from "next/image";

export default async function Article({ content, children }) {
    const markdownResult = await remark()
        .use(html)
        .process(content);
    // Process HTML to React components using rehype
    const articleContentJsx = await unified()
        .use(rehypeParse, { fragment: true })
        // .use(rehypeReact, production)
        .use(rehypeReact, {
            createElement,
            Fragment,
            jsx,
            jsxs,
            passNode: true,
            components: {
                // h1: ({ children }) => <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{children}</h1>,
                img: ({ src, alt }) => <Image src={src} alt={alt} width={400} height={200} />,
            },
        })
        .process(markdownResult.toString());

    return (<>
        <article className="prose">
            {articleContentJsx.result}
        </article>
        <div className="h-48 w-full">
            {children}
        </div>
    </>
    )
}