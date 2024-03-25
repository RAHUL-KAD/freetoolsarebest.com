import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nula',
            1: 'jedna',
            2: 'dva',
            3: 'tři',
            4: 'čtyři',
            5: 'pět',
            6: 'šest',
            7: 'sedm',
            8: 'osm',
            9: 'devět',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'deset',
            11: 'jedenáct',
            12: 'dvanáct',
            13: 'třináct',
            14: 'čtrnáct',
            15: 'patnáct',
            16: 'šestnáct',
            17: 'sedmnáct',
            18: 'osmnáct',
            19: 'devatenáct',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dvacet',
            3: 'třicet',
            4: 'čtyřicet',
            5: 'padesát',
            6: 'šedesát',
            7: 'sedmdesát',
            8: 'osmdesát',
            9: 'devadesát',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'tisíc',
            6: 'milionů',
            9: 'miliard',
            12: 'bilionů',
            15: 'biliard',
            18: 'trilionů',
        };
    
        if (num === 0) {
            return 'nula';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'set ';
                    quotient %= 100;
                }
    
                if (quotient >= 10 && quotient < 20) {
                    text += teensMap[quotient] + ' ';
                    quotient = 0;
                } else if (quotient >= 20) {
                    text += tensMap[Math.floor(quotient / 10)] + ' ';
                    quotient %= 10;
                }
    
                if (quotient > 0) {
                    text += unitsMap[quotient];
                }
    
                text += largeNumberSuffixes[i] + ' ';
                num %= divisor;
            }
        }
    
        return text.trim();
    };
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setNumber(value);
            setText(convertToText(value));
        } else {
            setText('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Convert numbers to text (Czech) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Czech)</h1>

                <input
                    type="number"
                    placeholder="Enter a number"
                    className="border border-gray-300 p-2 rounded-md mb-4"
                    onChange={handleChange}
                />
                <div className="text-lg font-semibold">{text}</div>

                {text && (
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NumberConverter;
