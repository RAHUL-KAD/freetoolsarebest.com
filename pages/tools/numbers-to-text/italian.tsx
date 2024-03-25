import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'zero',
            1: 'uno',
            2: 'due',
            3: 'tre',
            4: 'quattro',
            5: 'cinque',
            6: 'sei',
            7: 'sette',
            8: 'otto',
            9: 'nove',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'dieci',
            11: 'undici',
            12: 'dodici',
            13: 'tredici',
            14: 'quattordici',
            15: 'quindici',
            16: 'sedici',
            17: 'diciassette',
            18: 'diciotto',
            19: 'diciannove',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'venti',
            3: 'trenta',
            4: 'quaranta',
            5: 'cinquanta',
            6: 'sessanta',
            7: 'settanta',
            8: 'ottanta',
            9: 'novanta',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'mila',
            6: 'milioni',
            9: 'miliardi',
            12: 'bilioni',
            15: 'biliardi',
            18: 'trilioni',
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
                    text += unitsMap[Math.floor(quotient / 100)] + 'cento ';
                    quotient %= 100;
                }
    
                if (quotient >= 10 && quotient < 20) {
                    text += teensMap[quotient] + ' ';
                    quotient = 0;
                } else if (quotient >= 20) {
                    const tensDigit = Math.floor(quotient / 10);
                    const remainder = quotient % 10;
                    text += tensMap[tensDigit];
                    if (remainder !== 1 && remainder !== 8) {
                        text = text.slice(0, -1); // Remove last vowel if not 1 or 8
                    }
                    text += unitsMap[remainder] + ' ';
                    quotient = 0;
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
                <title>Convert numbers to text (italian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (italian)</h1>

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
