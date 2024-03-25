import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nulo',
            1: 'unu',
            2: 'du',
            3: 'tri',
            4: 'kvar',
            5: 'kvin',
            6: 'ses',
            7: 'sep',
            8: 'ok',
            9: 'naŭ',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'dek',
            11: 'dek unu',
            12: 'dek du',
            13: 'dek tri',
            14: 'dek kvar',
            15: 'dek kvin',
            16: 'dek ses',
            17: 'dek sep',
            18: 'dek ok',
            19: 'dek naŭ',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dudek',
            3: 'tridek',
            4: 'kvardek',
            5: 'kvindek',
            6: 'sesdek',
            7: 'sepdek',
            8: 'okdek',
            9: 'naŭdek',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mil',
            6: ' milion',
            9: ' miliardo',
            12: ' bilion',
            15: ' biliardo',
            18: ' trilion',
        };
    
        if (num === 0) {
            return 'nulo';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'cent ';
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
                <title>Convert numbers to text (Esperanto) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Esperanto)</h1>

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
