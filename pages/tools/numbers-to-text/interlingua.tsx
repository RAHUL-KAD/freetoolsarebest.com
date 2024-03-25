import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToInterlinguaText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'zero',
            1: 'un',
            2: 'duo',
            3: 'tres',
            4: 'quatro',
            5: 'cinque',
            6: 'sex',
            7: 'septe',
            8: 'octo',
            9: 'nove',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'dece',
            11: 'dece un',
            12: 'dece duo',
            13: 'dece tres',
            14: 'dece quatro',
            15: 'dece cinque',
            16: 'dece sex',
            17: 'dece septe',
            18: 'dece octo',
            19: 'dece nove',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'vinti',
            3: 'trenta',
            4: 'quaranta',
            5: 'cinquanta',
            6: 'sexanta',
            7: 'septanta',
            8: 'octanta',
            9: 'nonanta',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mil',
            6: ' million',
            9: ' milliard',
            12: ' billion',
            15: ' billiard',
            18: ' trillion',
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
                    text += unitsMap[Math.floor(quotient / 100)] + ' cento ';
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
            setText(convertToInterlinguaText(value));
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
                <title>Convert numbers to text (Interlingua) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Interlingua)</h1>

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
