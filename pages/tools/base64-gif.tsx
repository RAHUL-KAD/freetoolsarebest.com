import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../components/Header';

const Convert: React.FC = () => {
    const [base64String, setBase64String] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState('');

    const convertToImage = () => {
        try {
            if (base64String) {
                const image = `data:image/gif;base64,${base64String}`; // Change to GIF
                setImageSrc(image);
                setError('');
            } else {
                setError('Base64 string is empty.');
            }
        } catch (error) {
            console.error('Error decoding base64 string:', error);
            setError(`Error decoding base64 string: ${error}. Please try with another base64 string.`);
        }
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

    const downloadImage = () => {
        if (imageSrc) {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = 'converted_image.gif'; // Change to GIF filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>Base64 to GIF Converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Base64 to GIF Converter</h1>

                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={10}
                    placeholder="Enter base64 string here..."
                    value={base64String}
                    onChange={(e) => setBase64String(e.target.value)}
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
                        onClick={convertToImage}
                    >
                        Convert to GIF
                    </button>
                </div>

                {error && (
                    <p className='mt-10 text-red-500'>{error}</p>
                )}

                {imageSrc && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Converted GIF:</h2>
                        <button
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={downloadImage}
                        >
                            Download GIF
                        </button>
                        <img src={imageSrc} alt="Converted" className="max-w-full mt-5" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Convert;
