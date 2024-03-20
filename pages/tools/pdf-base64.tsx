import Head from "next/head";
import React, { useState } from "react";
import Header from "../../components/Header";

const IndexPage: React.FC = () => {
    const [base64Pdf, setBase64Pdf] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (file) {
                if (file.type !== 'application/pdf') {
                    setError('Please upload a PDF file.');
                    setBase64Pdf(null);
                    return;
                }

                const base64 = await convertToBase64(file);
                setBase64Pdf(base64);
                setError(null);
            }
        } catch (error) {
            setError('Error converting file to base64');
            console.error('Error converting file to base64:', error);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const base64Pdf = reader.result.split(",")[1];
                    resolve(base64Pdf);
                } else {
                    reject(new Error('Failed to read file as base64'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file as base64'));
            };
            reader.readAsDataURL(file);
        });
    };

    const copyToClipboard = () => {
        if (base64Pdf) {
            navigator.clipboard.writeText(base64Pdf);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    const downloadBase64AsTextFile = () => {
        if (base64Pdf) {
            const blob = new Blob([base64Pdf], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pdf_to_base64_ftools.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>PDF to Base64 Converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">PDF to Base64 Converter</h1>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="lg:mt-10 mt-5"
                />

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className=' mt-5 flex items-center justify-center'>
                    {base64Pdf && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-center mb-5">Base64 Text</h2>
                            <textarea
                                className="mt-2 border border-gray-300 rounded-md p-2 lg:w-[40rem] w-[20rem] h-[300px] "
                                rows={5}
                                value={base64Pdf}
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

export default IndexPage;
