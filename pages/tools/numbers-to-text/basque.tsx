import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'hutsik',
            1: 'bat',
            2: 'bi',
            3: 'hiru',
            4: 'lau',
            5: 'bost',
            6: 'sei',
            7: 'zazpi',
            8: 'zortzi',
            9: 'bederatzi',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'hamar',
            11: 'hamaika',
            12: 'hamabi',
            13: 'hamahiru',
            14: 'hamalaun',
            15: 'hamabost',
            16: 'hamasei',
            17: 'hamazazpi',
            18: 'hamazortzi',
            19: 'hemeretzi',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'hogei',
            3: 'hirurogei',
            4: 'berrogei',
            5: 'hogeita hamar',
            6: 'seigarren',
            7: 'zazpigarren',
            8: 'zortzigarren',
            9: 'bederatzigarren',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mila',
            6: ' milioi',
            9: ' bilioi',
            12: ' trilioi',
            15: ' triliardo',
            18: ' billioi',
        };
    
        if (num === 0) {
            return 'hutsik';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' ehun ';
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
                <title>Convert numbers to text (Basque) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Basque)</h1>

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
