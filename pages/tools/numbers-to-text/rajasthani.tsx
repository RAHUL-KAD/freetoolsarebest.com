import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'शून्य',
            1: 'एक',
            2: 'बेत',
            3: 'त्रेत',
            4: 'चौथ',
            5: 'पांचव',
            6: 'छठ',
            7: 'सातव',
            8: 'आठव',
            9: 'नौव',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'दस',
            11: 'ग्यारह',
            12: 'बारह',
            13: 'तेरह',
            14: 'चौदह',
            15: 'पंद्रह',
            16: 'सोलह',
            17: 'सत्रह',
            18: 'अठारह',
            19: 'उन्नीस',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'बीस',
            3: 'तीस',
            4: 'चालीस',
            5: 'पंजाह',
            6: 'साठ',
            7: 'सत्ताईस',
            8: 'अट्ठाईस',
            9: 'नब्बे',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' हजार',
            6: ' लाख',
            9: ' करोड़',
            12: ' अरब',
            15: ' खरब',
            18: ' नील',
        };
    
        if (num === 0) {
            return 'शून्य';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' सौ ';
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
                <title>Convert numbers to text (Rajasthani) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Rajasthani)</h1>

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
