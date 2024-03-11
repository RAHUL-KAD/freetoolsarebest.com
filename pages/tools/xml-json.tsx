import React, { useState } from 'react';
import { parseString } from 'xml2js';
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [xml, setXml] = useState('');
    const [json, setJson] = useState('');
    const [error, setError] = useState('');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setXml(e.target.value);
        setError(''); // Clear any previous error message
    };

    const convertXmlToJson = () => {
        parseString(xml, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                setError('Invalid XML format. Please check your input and try again.');
                setJson('');
                return;
            }

            setError(''); // Clear any previous error message
            setJson(JSON.stringify(result, null, 2));
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const xmlContent = reader.result as string;
                setXml(xmlContent);
            };
            reader.readAsText(file);
        }
    };

    const loadXmlFromUrl = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to load XML from URL');
            }
            const xmlContent = await response.text();
            setXml(xmlContent);
        } catch (error) {
            console.error('Error loading XML from URL:', error);
            setError('Failed to load XML from URL. Please check the URL and try again.');
        }
    };

    const copyJsonToClipboard = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    const saveJsonToFile = () => {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ftools_xml_to_json.json';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="py-2">
            <Head>
                <title>XML to JSON Converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">XML to JSON Converter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="xml-input" className="block font-bold mb-2">
                            XML Input
                        </label>
                        <textarea
                            id="xml-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={xml}
                            onChange={handleXmlChange}
                        />
                        <div className="flex gap-10 mt-4">
                            <label
                                htmlFor="file-input"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload XML File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".xml"
                                className="hidden"
                                onChange={handleFileUpload}
                            />

                            <button
                                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={convertXmlToJson}
                            >
                                Convert
                            </button>
                        </div>
                        {/* <div className='flex mt-5 gap-10'>
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-[10rem]"
                        />
                        <button
                            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={loadXmlFromUrl}
                        >
                            Load XML
                        </button>
                    </div> */}
                    </div>

                    <div className="relative">
                        <label htmlFor="json-output" className="block font-bold mb-2">
                            JSON Output
                        </label>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                        <pre
                            className="bg-gray-100 rounded-md p-4 overflow-auto prose prose-sm"
                            style={{ maxHeight: '400px' }}
                        >
                            {json}
                        </pre>
                        {json && (
                            <div className="absolute bottom-4 right-4 flex gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={copyJsonToClipboard}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={saveJsonToFile}
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
