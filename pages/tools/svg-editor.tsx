import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const SVGEditor: React.FC = () => {
    const [svgCode, setSvgCode] = useState<string>('');
    const [copied, setCopied] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSvgCode(event.target.value);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result) {
                    setSvgCode(e.target.result.toString());
                }
            };
            reader.readAsText(file);
        }
    };


    const handleClear = () => {
        setSvgCode('');
    };

    const handleSaveSVG = () => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image_svg_ftools.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopySVG = () => {
        navigator.clipboard.writeText(svgCode);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="py-2 flex flex-col justify-center items-center">
            <Head>
                <title>SVG Editor | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

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

            <div className="flex h-[33rem] lg:w-[65rem] w-[20rem] md:w-[40rem] md:mt-5 lg:mt-5 lg:h-[40rem] gap-2">
                <div className="flex flex-col w-1/2 h-full border border-gray-300 rounded-md p-3">
                    <div className="flex justify-between mb-2">
                        <label htmlFor="file-upload" className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-2 rounded cursor-pointer text-center">
                            Upload SVG
                        </label>
                        <input type="file" id="file-upload" accept=".svg" onChange={handleFileUpload} className="hidden" />
                        {svgCode && (
                            <div className='lg:flex md:flex gap-2 hidden'>

                                <button onClick={handleCopySVG} className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold text-sm py-1 px-2 rounded">{copied ? 'Copied!' : 'copy'}</button>
                                <button onClick={handleClear} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-2 rounded">Clear</button>
                            </div>
                        )}
                    </div>
                    <textarea
                        className="flex-1 resize-none rounded-md"
                        placeholder="Enter SVG code here to view"
                        value={svgCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-1/2 h-full border border-gray-300 rounded-md p-4 relative">
                    {svgCode ? (
                        <div dangerouslySetInnerHTML={{ __html: svgCode }} />
                    ) : (
                        <div>No SVG code to display</div>
                    )}
                    {svgCode && (
                        <button onClick={handleSaveSVG} className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-2 rounded">Save SVG</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SVGEditor;
