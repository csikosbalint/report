import { remark } from "remark";
import html from "remark-html";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { createElement } from "react";
import { Fragment, jsxs, jsx } from 'react/jsx-runtime'

import Image from "next/image";

/**
 * Renders an article component with markdown content converted to React components
 * @async
 * @param {Object} props - Component properties
 * @param {ArticleDTO} props.article - Article data transfer object containing article information
 * @param {React.ReactNode} props.children - Child components to render below the article
 * @returns {Promise<Element>} A Promise that resolves to the rendered article component
 * @throws {Error} If markdown processing or HTML conversion fails
 */
export default async function Article({ article, children }) {
    const markdownResult = await remark()
        .use(html)
        .process(article.content);
    // Process HTML to React components using rehype
    const articleContentJsx = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement,
            Fragment,
            jsx,
            jsxs,
            passNode: true,
            components: {
                h1: (props) => <h1 className="text-xl md:prose-h1" {...props} />,
                img: (img) => {
                    const { src, alt } = img;
                    return (
                        <div className="w-full flex flex-col items-center mb-8">
                            <Image className="mb-1" src={src} alt={alt} width={400} height={200} />
                            <div className="font-extralight text-sm">({alt})</div>
                        </div>
                    )
                }
            },
        })
        .process(markdownResult.toString());

    return (<div className="">
        <article className="prose prose-lg md:prose-sm text-xl md:text-lg md:min-w-fit mx-1 md:mx-48">
            {articleContentJsx.result}
        </article>
        <div className="md:h-48 md:m-8 bg-rose-50">
            {children}
        </div>
    </div>
    )
}