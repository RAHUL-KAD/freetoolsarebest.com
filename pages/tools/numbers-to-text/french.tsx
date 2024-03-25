import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'zéro',
            1: 'un',
            2: 'deux',
            3: 'trois',
            4: 'quatre',
            5: 'cinq',
            6: 'six',
            7: 'sept',
            8: 'huit',
            9: 'neuf',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'dix',
            11: 'onze',
            12: 'douze',
            13: 'treize',
            14: 'quatorze',
            15: 'quinze',
            16: 'seize',
            17: 'dix-sept',
            18: 'dix-huit',
            19: 'dix-neuf',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'vingt',
            3: 'trente',
            4: 'quarante',
            5: 'cinquante',
            6: 'soixante',
            7: 'soixante-dix',
            8: 'quatre-vingts',
            9: 'quatre-vingt-dix',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mille',
            6: ' million',
            9: ' milliard',
            12: ' billion',
            15: ' billiard',
            18: ' trillion',
        };
    
        if (num === 0) {
            return 'zéro';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' cent ';
                    quotient %= 100;
                }
    
                if (quotient >= 10 && quotient < 20) {
                    text += teensMap[quotient] + ' ';
                    quotient = 0;
                } else if (quotient >= 20) {
                    const tensDigit = Math.floor(quotient / 10);
                    const remainder = quotient % 10;
                    text += tensMap[tensDigit];
                    if (remainder !== 0) {
                        text += '-' + unitsMap[remainder];
                    }
                    text += ' ';
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
                <title>Convert numbers to text (french) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (french)</h1>

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
