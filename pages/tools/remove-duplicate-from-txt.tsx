import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [textContent, setTextContent] = useState(''); // State to store text content
    const [uniqueContent, setUniqueContent] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.target.value);
        setError(''); // Clear any previous error message
    };

    const removeDuplicates = () => {
        try {
            const lines = textContent.split('\n');
            const uniqueLines = Array.from(new Set(lines)).join('\n');
            setUniqueContent(uniqueLines);
            setError(''); // Clear any previous error message
        } catch (error) {
            console.error('Error removing duplicates:', error);
            setError('An error occurred while removing duplicates.');
            setUniqueContent('');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const textContent = reader.result as string;
                setTextContent(textContent);
            };
            reader.readAsText(file);
        }
    };

    const copyUniqueToClipboard = () => {
        navigator.clipboard.writeText(uniqueContent);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    const saveUniqueToFile = () => {
        const blob = new Blob([uniqueContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'unique_values.txt';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Remove Duplicates from .txt file | Your App Name</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Remove Duplicates from .txt file</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="text-input" className="block font-bold mb-2">
                            Enter Text
                        </label>
                        <textarea
                            id="text-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={textContent}
                            onChange={handleTextChange}
                        />
                        <div className="flex gap-10 mt-4">
                            <label
                                htmlFor="file-input"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload Text File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".txt"
                                className="hidden"
                                onChange={handleFileUpload}
                            />

                            {textContent && (
                                <button
                                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={removeDuplicates}
                                >
                                    Remove Duplicates
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="unique-output" className="block font-bold mb-2">
                            Unique Values
                        </label>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                        <pre
                            className="bg-gray-100 rounded-md p-4 overflow-auto prose prose-sm"
                            style={{ maxHeight: '400px' }}
                        >
                            {uniqueContent}
                        </pre>
                        {uniqueContent && (
                            <div className="absolute bottom-4 right-4 flex gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={copyUniqueToClipboard}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={saveUniqueToFile}
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

export default App;
