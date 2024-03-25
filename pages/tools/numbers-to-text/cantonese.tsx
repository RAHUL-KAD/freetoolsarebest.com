import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: '零',
            1: '一',
            2: '二',
            3: '三',
            4: '四',
            5: '五',
            6: '六',
            7: '七',
            8: '八',
            9: '九',
        };
    
        const teensMap: { [key: number]: string } = {
            10: '十',
            11: '十一',
            12: '十二',
            13: '十三',
            14: '十四',
            15: '十五',
            16: '十六',
            17: '十七',
            18: '十八',
            19: '十九',
        };
    
        const tensMap: { [key: number]: string } = {
            2: '二十',
            3: '三十',
            4: '四十',
            5: '五十',
            6: '六十',
            7: '七十',
            8: '八十',
            9: '九十',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            4: '千',
            8: '萬',
        };
    
        if (num === 0) {
            return '零';
        }
    
        let text = '';
    
        for (let i = 8; i >= 0; i -= 4) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 10) {
                    text += unitsMap[quotient / 10] + '十';
                    quotient %= 10;
                } else if (quotient > 0) {
                    text += unitsMap[quotient];
                }
    
                if (i > 0) {
                    text += largeNumberSuffixes[i];
                }
    
                num %= divisor;
    
                if (quotient === 0 && num > 0 && num < 10) {
                    text += unitsMap[0];
                }
            }
        }
    
        return text;
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
                <title>Convert numbers to text (Cantonese) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Cantonese)</h1>

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
