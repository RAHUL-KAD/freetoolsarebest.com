import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToLatvianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nulle',
            1: 'viens',
            2: 'divi',
            3: 'trīs',
            4: 'četri',
            5: 'pieci',
            6: 'seši',
            7: 'septiņi',
            8: 'astoņi',
            9: 'deviņi',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'desmit',
            11: 'vienpadsmit',
            12: 'divpadsmit',
            13: 'trīspadsmit',
            14: 'četrpadsmit',
            15: 'piecpadsmit',
            16: 'sešpadsmit',
            17: 'septiņpadsmit',
            18: 'astoņpadsmit',
            19: 'deviņpadsmit',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'divdesmit',
            3: 'trīsdesmit',
            4: 'četrdesmit',
            5: 'piecdesmit',
            6: 'sešdesmit',
            7: 'septiņdesmit',
            8: 'astoņdesmit',
            9: 'deviņdesmit',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' tūkstoš',
            6: ' miljons',
            9: ' miljards',
            12: ' biljons',
            15: ' triljons',
            18: ' kvadriljons',
        };
    
        if (num === 0) {
            return 'nulle';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' simts ';
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
            setText(convertToLatvianText(value));
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
                <title>Convert numbers to text (Latvian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Latvian)</h1>

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
