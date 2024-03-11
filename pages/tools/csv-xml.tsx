import React, { useState } from 'react';
import xmlbuilder from 'xmlbuilder';
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
    const [xmlResult, setXmlResult] = useState('');
    const [csv, setCsv] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCsvChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCsv(e.target.value);
        setError('');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const csvContent = reader.result as string;
                setCsv(csvContent);
            };
            reader.readAsText(file);
        }
    };

    const convertCsvToXml = () => {
        try {
            const rows = csv.trim().split('\n').map(row => row.split(','));
            const xmlString = csvToXml(rows);
            setXmlResult(xmlString);
            setError('');
        } catch (error) {
            console.error('Error converting CSV to XML:', error);
            setError('Invalid CSV format. Please check your input and try again.');
            setXmlResult('');
        }
    };

    const csvToXml = (rows: string[][]) => {
        const root = xmlbuilder.create('data');
        rows.forEach(row => {
            const item = root.ele('item');
            row.forEach((value, index) => {
                item.ele(`field${index}`, value);
            });
        });
        return root.end({ pretty: true });
    };

    const copyXmlToClipboard = () => {
        navigator.clipboard.writeText(xmlResult);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const saveXmlToFile = () => {
        const blob = new Blob([xmlResult], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'csv_to_xml.xml';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="py-2">
            <Head>
                <title>CSV to XML Converter | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">CSV to XML Converter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="csv-input" className="block font-bold mb-2">
                            CSV Input
                        </label>
                        <textarea
                            id="csv-input"
                            className="border border-gray-300 rounded-md p-2 w-full h-[400px]"
                            rows={10}
                            value={csv}
                            onChange={handleCsvChange}
                        />
                        <div className="flex gap-10 mt-4">
                            <label
                                htmlFor="file-input"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            >
                                Upload CSV File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                            <button
                                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                onClick={convertCsvToXml}
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
        </div>
    );
};

export default App;
