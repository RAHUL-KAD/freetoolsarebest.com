import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'പൂജ്യം',
            1: 'ഒന്ന്',
            2: 'രണ്ട്',
            3: 'മൂന്ന്',
            4: 'നാല്',
            5: 'അഞ്ച്',
            6: 'ആറ്',
            7: 'ഏഴ്',
            8: 'എട്ട്',
            9: 'ഒമ്പത്',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'പത്ത്',
            11: 'പതിനൊന്ന്',
            12: 'പന്ത്രണ്ട്',
            13: 'പതിമൂന്ന്',
            14: 'പതിനാല്',
            15: 'പതിനഞ്ച്',
            16: 'പതിനാറ്',
            17: 'പതിനേഴ്',
            18: 'പതിനെട്ട്',
            19: 'പത്തൊമ്പത്',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'ഇരട്ട',
            3: 'മുപ്പത്',
            4: 'നാല്പ്പത്',
            5: 'അഞ്ചത്ത്',
            6: 'ആറത്ത്',
            7: 'ഏഴത്ത്',
            8: 'എട്ടത്ത്',
            9: 'ഒമ്പത്ത്',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' ആയിരം',
            6: ' ലക്ഷം',
            9: ' കോടി',
            12: ' അരബ്',
            15: ' ഖരബ്',
            18: ' നീല',
        };
    
        if (num === 0) {
            return 'പൂജ്യം';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' നൂറ് ';
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
                <title>Convert numbers to text (Malayalam) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Malayalam)</h1>

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
