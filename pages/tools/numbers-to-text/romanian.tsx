import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToRomanianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'zero',
            1: 'unu',
            2: 'doi',
            3: 'trei',
            4: 'patru',
            5: 'cinci',
            6: 'șase',
            7: 'șapte',
            8: 'opt',
            9: 'nouă',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'zece',
            11: 'unsprezece',
            12: 'doisprezece',
            13: 'treisprezece',
            14: 'paisprezece',
            15: 'cincisprezece',
            16: 'șaisprezece',
            17: 'șaptesprezece',
            18: 'optsprezece',
            19: 'nouăsprezece',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'douăzeci',
            3: 'treizeci',
            4: 'patruzeci',
            5: 'cincizeci',
            6: 'șaizeci',
            7: 'șaptezeci',
            8: 'optzeci',
            9: 'nouăzeci',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mia',
            6: ' milion',
            9: ' miliard',
            12: ' bilion',
            15: ' trilion',
            18: ' cvadrilion',
        };
    
        if (num === 0) {
            return 'zero';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' sute ';
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
                    if (i === 3 && quotient === 1) {
                        text += 'un';
                    } else {
                        text += unitsMap[quotient];
                    }
                    text += largeNumberSuffixes[i] + ' ';
                }
    
                num %= divisor;
            }
        }
    
        return text.trim();
    };
    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setNumber(value);
            setText(convertToRomanianText(value));
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
                <title>Convert numbers to text (Romanian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Romanian)</h1>

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
