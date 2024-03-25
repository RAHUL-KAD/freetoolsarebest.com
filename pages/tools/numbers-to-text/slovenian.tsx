import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToSlovenianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nič',
            1: 'ena',
            2: 'dva',
            3: 'tri',
            4: 'štiri',
            5: 'pet',
            6: 'šest',
            7: 'sedem',
            8: 'osem',
            9: 'devet',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'deset',
            11: 'enajst',
            12: 'dvanajst',
            13: 'trinajst',
            14: 'štirinajst',
            15: 'petnajst',
            16: 'šestnajst',
            17: 'sedemnajst',
            18: 'osemnajst',
            19: 'devetnajst',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dvajset',
            3: 'trideset',
            4: 'štirideset',
            5: 'petdeset',
            6: 'šestdeset',
            7: 'sedemdeset',
            8: 'osemdeset',
            9: 'devetdeset',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' tisoč',
            6: ' milijon',
            9: ' milijarda',
            12: ' bilijon',
            15: ' bilijarda',
            18: ' trilijon',
        };
    
        if (num === 0) {
            return 'nič';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'sto ';
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
                    text += unitsMap[quotient] + ' ';
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
            setText(convertToSlovenianText(value));
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
                <title>Convert numbers to text (Slovenian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Slovenian)</h1>

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
