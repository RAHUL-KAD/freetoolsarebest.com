import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

// https://chat.openai.com/share/20244047-5b1c-4874-bb8b-7b7d0312d72d

const SVGEditor: React.FC = () => {
    const [svgCode, setSvgCode] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSvgCode(event.target.value);
    };
    const renderLineNumbers = () => {
        const lines = svgCode.split('\n');
        return lines.map((_, index) => <div key={index + 1}>{index + 1}</div>);
      };
    

    return (

        <div className="py-2 flex flex-col justify-center items-center">
            <Head>
                <title>SVG Editor | freetoolsarebest </title>
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
            <div className="flex h-[33rem] lg:w-[65rem] w-[20rem] md:w-[40rem] md:mt-5 lg:mt-5">
                {/* <div className="w-[2rem] border-r border-gray-300 p-3">
                    {renderLineNumbers()}
                </div> */}
                <textarea
                    className="w-1/2 h-full border border-gray-300 p-3"
                    placeholder="Enter SVG code here to view"
                    value={svgCode}
                    onChange={handleChange}
                />
                <div className="w-1/2 h-full border border-gray-300 p-4" dangerouslySetInnerHTML={{ __html: svgCode }} />
            </div>
        </div>
    );
};

export default SVGEditor;
