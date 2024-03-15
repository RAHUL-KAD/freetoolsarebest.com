// BulkIPAddressDownload.tsx
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Head from 'next/head';

const generateIPv4 = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const generateIPv6 = () => {
    const group = () => Math.random().toString(16).slice(2, 6);
    return `${group()}:${group()}:${group()}:${group()}:${group()}:${group()}:${group()}:${group()}`;
};

const BulkIPAddressDownload: React.FC = () => {
    const [bulkLimit, setBulkLimit] = useState<number>(10000);
    const [selectedType, setSelectedType] = useState<string>('ipv4');
    const [bulkInput, setBulkInput] = useState<number>(1000); // Initialize with a default value
    const [inputLimitReached, setInputLimitReached] = useState<boolean>(false);

    const handleBulkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 10000) {
            setInputLimitReached(true);
            setTimeout(() => {
                setInputLimitReached(false);
            }, 5000); // Show the message for 5 seconds
            setBulkInput(10000);
        } else {
            setBulkInput(value);
        }
    };

    const handleTypeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleBulkDownload = () => {
        let addresses = '';
        const generateAddress = selectedType === 'ipv4' ? generateIPv4 : generateIPv6;
        for (let i = 0; i < bulkInput; i++) {
            addresses += generateAddress() + '\n';
        }
        const blob = new Blob([addresses], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulk_addresses_${selectedType}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Bulk IP Address Download | Your App Title</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Bulk IP Address Download</h1>

                {/* Bulk IP Address Download */}
                <div className="mt-10">
                    <div className="mt-4">
                        <input type="number" value={bulkInput.toString()} onChange={handleBulkInput} className="border border-gray-300 rounded-md px-2 py-1 mr-4" />
                        {inputLimitReached && <p className="text-red-500">Input limit is 10000</p>}
                        <select value={selectedType} onChange={handleTypeSelection} className="border border-gray-300 rounded-md px-2 py-1 mr-4">
                            <option value="ipv4">IPv4</option>
                            <option value="ipv6">IPv6</option>
                        </select>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBulkDownload}>
                            Bulk Download
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => handleCopyToClipboard(`${bulkInput} ${selectedType}`)}>
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkIPAddressDownload;
