// IPv4Generator.tsx
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';

const generateIPv4 = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const IPv4Generator: React.FC = () => {
    const [ipv4, setIPv4] = useState<string>('');
    const [bulkLimit, setBulkLimit] = useState<number>(10000);
    const [bulkInput, setBulkInput] = useState<number>(100); // Initialize with a default value

    useEffect(() => {
        generateIPv4Address();
    }, []);

    const generateIPv4Address = () => {
        setIPv4(generateIPv4());
    };

    const handleBulkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > bulkLimit) {
            setBulkInput(bulkLimit);
            alert("Input limit is " + bulkLimit);
        } else {
            setBulkInput(value);
        }
    };

    const handleBulkDownload = () => {
        let addresses = '';
        for (let i = 0; i < bulkInput; i++) {
            addresses += generateIPv4() + '\n';
        }
        const blob = new Blob([addresses], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulk_${bulkInput}_ipv4_addresses_ftools.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = (ip: string) => {
        navigator.clipboard.writeText(ip);
        // You can implement the copied state if needed
    };

    return (
        <div className="py-2">
            <Head>
                <title>Random IPv4 Address Generator | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <div>
                    <h1 className="text-3xl font-bold text-center mt-5 mb-5">Random IPv4 Address Generator</h1>
                </div>
                <div className="flex items-center justify-center mb-5">
                    <p className="border border-gray-300 rounded-md text-center p-2 w-64">{ipv4}</p>
                </div>
                <div className="flex items-center justify-center mb-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3" onClick={generateIPv4Address}>
                        Randomise
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3" onClick={() => copyToClipboard(ipv4)}>
                        Copy
                    </button>

                </div>
                <div className='mt-10 flex flex-col items-center justify-center'>
                    <p className='text-center mb-5 font-semibold'>Download bulk random IPv4 addresses</p>
                    <div className='flex gap-5 mb-5'>
                        <p>No of Ipv4 addresses : </p>
                        <input type="number" value={bulkInput} onChange={handleBulkInput} className="border border-gray-300 rounded-md px-2 py-1 mr-4" />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBulkDownload}>
                        Bulk Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IPv4Generator;
