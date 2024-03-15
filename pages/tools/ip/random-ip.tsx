import React, { useState, useEffect } from 'react';
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

const IPAddressGenerator: React.FC = () => {
    const [ipv4, setIPv4] = useState<string>('');
    const [ipv6, setIPv6] = useState<string>('');
    const [copiedv4, setCopiedv4] = useState(false);
    const [copiedv6, setCopiedv6] = useState(false);


    useEffect(() => {
        generateIPv4Addresse();
        generateIPv6Addresse();
    }, []);

    const generateIPv4Addresse = () => {
        setIPv4(generateIPv4());
        // setIPv6(generateIPv6());
    };

    const generateIPv6Addresse = () => {
        // setIPv4(generateIPv4());
        setIPv6(generateIPv6());
    };

    const copyToClipboardv4 = (ip: string) => {
        navigator.clipboard.writeText(ip);
        setCopiedv4(true);
        setTimeout(() => {
            setCopiedv4(false);
        }, 2000); // Reset copied state after 2 seconds
    };
    const copyToClipboardv6 = (ip: string) => {
        navigator.clipboard.writeText(ip);
        setCopiedv6(true);
        setTimeout(() => {
            setCopiedv6(false);
        }, 2000); // Reset copied state after 2 seconds
    };

    return (
        <div className="py-2">
            <Head>
                <title>Random IPv4 and IPv6 generator | Your App Title</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Random IP address generator</h1>

                <div className='lg:flex lg:gap-[7rem] mt-5'>
                    <div className='lg:flex lg:flex-col lg:items-center lg:justify-center'>
                        <div>
                            <h2 className="text-lg font-bold text-center">Random IPv4 Address</h2>
                            <p className="border border-gray-300 rounded-md text-center p-2 mt-2 lg:w-[23rem]">{ipv4}</p>
                        </div>
                        <div className='mt-5 flex items-center justify-center lg:mb-0 md:mb-10 mb-10'>
                            <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" onClick={generateIPv4Addresse}>
                                Randomise
                            </button>
                            <button className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2 px-4 rounded" onClick={() => copyToClipboardv4(ipv4)}>
                                {copiedv4 ? 'Copied!' : 'Copy'}                            </button>
                        </div>
                    </div>

                    <div className='lg:flex lg:flex-col lg:items-center lg:justify-center'>
                        <div className="">
                            <h2 className="text-lg font-bold text-center">Random IPv6 Address</h2>
                            <p className="border border-gray-300 rounded-md text-center p-2 mt-2 lg:w-[23rem]">{ipv6}</p>
                        </div>
                        <div className='mt-5 flex items-center justify-center'>
                            <button className="mr-2 bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateIPv6Addresse}>
                                Randomise
                            </button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 text-sm rounded" onClick={() => copyToClipboardv6(ipv6)}>
                                {copiedv6 ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IPAddressGenerator;
