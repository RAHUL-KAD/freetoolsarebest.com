import React, { useState } from 'react';
import yaml from 'js-yaml'; // Import js-yaml library for YAML conversion
import xmljs from 'xml-js'; // Import xml-js library for XML conversion
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [yamlInput, setYamlInput] = useState(''); // State to store YAML input
    const [xmlResult, setXmlResult] = useState(''); // State to store XML result
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleYamlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setYamlInput(e.target.value);
        setError(''); // Clear any previous error message
    };

    const convertYamlToXml = () => {
        try {
            const parsedYaml = yaml.load(yamlInput) as Record<string, any>;
            const xmlString = xmljs.js2xml(parsedYaml, { compact: true, spaces: 2 });
            setXmlResult(xmlString);
            setError('');
        } catch (error) {
            console.error('Error converting YAML to XML:', error);
            setError('Invalid YAML format. Please check your input and try again.');
            setXmlResult('');
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
        const blob = new Blob([xmlResult], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ftools_yaml_to_xml.xml';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const yamlContent = reader.result as string;
                setYamlInput(yamlContent);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>YAML to XML Converter | Your App Title</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">YAML to XML Converter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="yaml-input" className="block font-bold mb-2">
                            YAML Input
                        </label>
                        <textarea
                            id="yaml-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={yamlInput}
                            onChange={handleYamlChange}
                        />
                        <div className="mt-4 flex gap-10">
                            <label
                                htmlFor="file-input"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload YAML File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".yaml,.yml"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                            <button
                                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={convertYamlToXml}
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
                            id="xml-output"
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
        </div>
    );
};

export default App;
