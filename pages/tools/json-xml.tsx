import React, { useState } from 'react';
import xmlbuilder from 'xmlbuilder'; // Import xmlbuilder library for XML conversion
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [xmlResult, setXmlResult] = useState(''); // State to store XML result
    const [json, setJson] = useState('');
    const [error, setError] = useState('');
    const [url, setUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJson(e.target.value);
        setError(''); // Clear any previous error message
    };

    const convertJsonToXml = () => {
        try {
            const parsedJson = JSON.parse(json);
            const xmlString = jsonToXml(parsedJson); // Convert JSON to XML
            setXmlResult(xmlString);
            setError(''); // Clear any previous error message
        } catch (error) {
            console.error('Error converting JSON to XML:', error);
            setError('Invalid JSON format. Please check your input and try again.');
            setXmlResult('');
        }
    };

    const jsonToXml = (jsonObject: any) => {
        const root = xmlbuilder.create('catalog');
        const buildXml = (node: any, obj: any) => {
            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    if (Array.isArray(obj[key])) {
                        obj[key].forEach((item: any) => {
                            buildXml(node.ele(key), item);
                        });
                    } else {
                        buildXml(node.ele(key), obj[key]);
                    }
                } else {
                    node.ele(key, obj[key]);
                }
            }
        };
        buildXml(root, jsonObject);
        return root.end({ pretty: true });
    };


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const jsonContent = reader.result as string;
                setJson(jsonContent);
            };
            reader.readAsText(file);
        }
    };

    const copyXmlToClipboard = () => {
        navigator.clipboard.writeText(xmlResult);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    const saveXmlToFile = () => {
        const blob = new Blob([xmlResult], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ftools_json_to_xml.xml';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="container mx-auto p-4">
            <Head>
                <title>XML Editor and Viewer | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <h1 className="text-3xl font-bold text-center mt-5 mb-5">JSON to XML Converter</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="json-input" className="block font-bold mb-2">
                        JSON Input
                    </label>
                    <textarea
                        id="json-input"
                        className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                        rows={10}
                        value={json}
                        onChange={handleJsonChange}
                    />
                    <div className="flex gap-10 mt-4">
                        <label
                            htmlFor="file-input"
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        >
                            Upload JSON File
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={handleFileUpload}
                        />

                        <button
                            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={convertJsonToXml}
                        >
                            Convert
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="xml-output" className="block font-bold mb-2">
                        XML Output
                    </label>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                    <pre
                        className="bg-gray-100 rounded-md p-4 overflow-auto prose prose-sm"
                        style={{ maxHeight: '400px' }}
                    >
                        {xmlResult}
                    </pre>
                    {xmlResult && (
                        <div className="absolute bottom-4 right-4 flex gap-4">
                            <button
                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                                onClick={copyXmlToClipboard}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                                onClick={saveXmlToFile}
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
