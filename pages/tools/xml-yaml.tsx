import React, { useState } from 'react';
import yaml from 'js-yaml'; // Import js-yaml library for YAML conversion
import xmlParser from 'xml-js'; // Import xml-js library for XML parsing
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [yamlResult, setYamlResult] = useState(''); // State to store YAML result
    const [xmlContent, setXmlContent] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleXmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setXmlContent(e.target.value);
        setError(''); // Clear any previous error message
    };

    const convertXmlToYaml = () => {
        try {
            const parsedXml = xmlParser.xml2js(xmlContent, { compact: true }); // Parse XML to JSON
            const yamlString = yaml.dump(parsedXml); // Convert JSON to YAML
            setYamlResult(yamlString);
            setError(''); // Clear any previous error message
        } catch (error) {
            console.error('Error converting XML to YAML:', error);
            setError('Invalid XML format. Please check your input and try again.');
            setYamlResult('');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const xmlContent = reader.result as string;
                setXmlContent(xmlContent);
            };
            reader.readAsText(file);
        }
    };

    const copyYamlToClipboard = () => {
        navigator.clipboard.writeText(yamlResult);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    const saveYamlToFile = () => {
        const blob = new Blob([yamlResult], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ftools_xml_to_yaml.yaml';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="py-2">
            <Head>
                <title>XML to YAML converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">XML to YAML Converter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="xml-input" className="block font-bold mb-2">
                            XML Input
                        </label>
                        <textarea
                            id="xml-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={xmlContent}
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
                                onClick={convertXmlToYaml}
                            >
                                Convert
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="yaml-output" className="block font-bold mb-2">
                            YAML Output
                        </label>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
                        <pre
                            className="bg-gray-100 rounded-md p-4 overflow-auto prose prose-sm"
                            style={{ maxHeight: '400px' }}
                        >
                            {yamlResult}
                        </pre>
                        {yamlResult && (
                            <div className="absolute bottom-4 right-4 flex gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={copyYamlToClipboard}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                                    onClick={saveYamlToFile}
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
