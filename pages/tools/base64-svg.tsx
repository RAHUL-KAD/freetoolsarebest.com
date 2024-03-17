import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const Base64ToSVGConverter: React.FC = () => {
    const [base64String, setBase64String] = useState<string>('');
    const [svgContent, setSvgContent] = useState<string>('');
    const [error, setError] = useState('');

    const handleBase64Change = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBase64String(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
                setBase64String(result);
            }
        };
        reader.readAsText(file);
    };

    const convertToSVG = () => {
        try {
            const decodedData = atob(base64String);
            const svgString = decodeURIComponent(escape(decodedData));
            setSvgContent(svgString);
        } catch (error) {
            console.error('Error decoding base64 string:', error);
            setError(`Error decoding base64 string:', ${error}. \n Please try with another base64 string`)
        }
    };

    const downloadSVG = () => {
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Base64 to SVG Converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Base64 to SVG Converter</h1>

                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={10}
                    placeholder="Enter base64 string here..."
                    value={base64String}
                    onChange={handleBase64Change}
                />
                <div className="mt-4 flex items-center justify-center gap-5 ">
                    <div className='mt-4'>
                        <label
                            htmlFor="file-input"
                            className="bg-gray-700 flex flex-col items-center justify-center hover:bg-gray-600 text-white font-bold px-4 h-[2.5rem] rounded cursor-pointer"
                        >
                            Upload .txt File
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept=".txt"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={convertToSVG}
                    >
                        Convert to SVG
                    </button>
                </div>

                {error && (
                    <p className='mt-10 text-red-500'>{error}</p>
                )}

                {svgContent && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Converted SVG:</h2>
                        <button
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={downloadSVG}
                        >
                            Download SVG
                        </button>
                        <div dangerouslySetInnerHTML={{ __html: svgContent }} />

                    </div>
                )}
            </div>
        </div>
    );
};

export default Base64ToSVGConverter;
