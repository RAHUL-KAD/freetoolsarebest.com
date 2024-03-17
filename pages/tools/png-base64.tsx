import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

// https://chat.openai.com/share/50535630-b4dc-46d9-9d7b-95d1c3cbeaa8

const ImageToBase64Converter: React.FC = () => {
    const [base64String, setBase64String] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                const base64String = base64.split(',')[1]; // Extracting only base64 string
                setBase64String(base64String);
            };
            reader.readAsDataURL(file);
        } else {
            setBase64String(null);
        }
    };

    const copyToClipboard = () => {
        if (base64String) {
            navigator.clipboard.writeText(base64String);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    const downloadBase64AsTextFile = () => {
        if (base64String) {
            const blob = new Blob([base64String], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'png_to_base64_ftools.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>PNG to Base64 converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">PNG to Base64 Converter</h1>
                
                <input
                    type="file"
                    accept="image/png"
                    onChange={handleImageChange}
                    className="lg:mt-10 mt-5"
                />

                <div className=' mt-5 flex items-center justify-center'>
                    {base64String && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-center mb-5">Base64 Text</h2>
                            <textarea
                                className="mt-2 border border-gray-300 rounded-md p-2 lg:w-[40rem] w-[20rem] h-[300px] "
                                rows={5}
                                value={base64String}
                                readOnly
                            />
                            <div className="flex mt-5 items-center justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mr-2 rounded"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                                    onClick={downloadBase64AsTextFile}
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageToBase64Converter;
