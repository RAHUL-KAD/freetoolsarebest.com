import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import Head from 'next/head';
import Header from '../../components/Header';

// https://chat.openai.com/share/96f25063-7876-42ea-92da-995df870b178

const HTMLViewer: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [editorWidth, setEditorWidth] = useState<string>('600px');
    const [editorHeight, setEditorHeight] = useState<string>('400px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setEditorWidth('90vw');
                setEditorHeight('60vh');
            } else {
                setEditorWidth('700px');
                setEditorHeight('400px');
            }
        };

        handleResize(); // Initial call to set dimensions based on screen size

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleChange = (value: string) => {
        setHtmlContent(value);
    };

    return (
        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>HTML viewer | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-green-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width="200"
                        height="200"
                        x="50%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>

            <Header />
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                <h1 className="font-display mx-auto max-w-4xl text-center text-xl font-bold tracking-normal text-slate-900 sm:text-xl">
                    <span className="relative text-[#333] whitespace-wrap">
                        <span className="relative mr-2">
                            HTML viewer
                        </span>
                    </span>
                </h1>
                <div className="flex flex-col items-center justify-center mt-5">
                    <AceEditor
                        mode="html"
                        theme="Mac Classic"
                        onChange={handleChange}
                        value={htmlContent}
                        width={editorWidth}
                        height={editorHeight}
                    />
                    <div className="mt-4">
                        <h2 className="text-xl font-bold mb-2">Preview:</h2>
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HTMLViewer;
