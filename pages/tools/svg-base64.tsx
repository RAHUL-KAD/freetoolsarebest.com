// pages/index.tsx
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../components/Header';

// https://chat.openai.com/share/6404b166-2264-4e9e-9d06-dce0f06594d8

const Home: React.FC = () => {
    const [svgContent, setSvgContent] = useState('');
    const [base64String, setBase64String] = useState('');
    const [showTextArea, setShowTextArea] = useState(false);
    const [copied, setCopied] = useState(false);


    const handleSvgInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSvgContent(event.target.value);
    };

    const handleUploadSvg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setSvgContent(e.target.result);
                    setShowTextArea(true);
                }
            };
            reader.readAsText(file);
        }
    };

    const convertToBase64 = () => {
        const encodedSvg = btoa(svgContent);
        setBase64String(encodedSvg);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64String);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    const downloadAsTxt = () => {
        const element = document.createElement('a');
        const file = new Blob([base64String], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'base64.txt';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="py-2">
            <Head>
                <title>SVG to Base64 converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">SVG to Base64 Converter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="xml-input" className="block font-bold mb-2">
                            SVG input
                        </label>
                        <textarea
                            id="xml-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={svgContent}
                            onChange={handleSvgInputChange}
                        />
                        <div className="flex gap-10 mt-4">
                            <label
                                htmlFor="file-input"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload SVG File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".svg"
                                className="hidden"
                                onChange={handleUploadSvg}
                            />

                            <button
                                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={convertToBase64}
                            >
                                Convert
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="yaml-output" className="block font-bold mb-2">
                            Base64 Output
                        </label>
                        {/* {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>} */}

                        {!base64String && (
                            <pre
                                className="bg-gray-100 rounded-md p-4 overflow-auto prose prose-sm"
                                style={{ maxHeight: '400px' }}
                            >
                                {/* // {base64String} */}
                            </pre>
                        )}
                        {base64String && (
                            <div className="mb-4">
                                <textarea
                                    className="border border-gray-300 bg-gray-100 rounded-md overflow-auto prose prose-sm p-2 w-full mb-2 h-[400px]"
                                    value={base64String}
                                    readOnly
                                    rows={10}
                                />
                            </div>
                        )}
                        {base64String && (
                            <div className="absolute bottom-4 right-4 flex gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? 'Copied!' : 'copy'}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={downloadAsTxt}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Home;
