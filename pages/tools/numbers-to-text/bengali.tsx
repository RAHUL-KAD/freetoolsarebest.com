import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'শূন্য',
            1: 'এক',
            2: 'দুই',
            3: 'তিন',
            4: 'চার',
            5: 'পাঁচ',
            6: 'ছয়',
            7: 'সাত',
            8: 'আট',
            9: 'নয়',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'দশ',
            11: 'এগারো',
            12: 'বারো',
            13: 'তেরো',
            14: 'চৌদ্দ',
            15: 'পনেরো',
            16: 'ষোল',
            17: 'সতের',
            18: 'আঠারো',
            19: 'ঊনিশ',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'বিশ',
            3: 'ত্রিশ',
            4: 'চল্লিশ',
            5: 'পঞ্চাশ',
            6: 'ষাট',
            7: 'সত্তর',
            8: 'আশি',
            9: 'নব্বই',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' হাজার',
            6: ' লাখ',
            9: ' কোটি',
            12: ' অরব',
            15: ' নিকুটি',
            18: ' পদ্ম',
        };
    
        if (num === 0) {
            return 'শূন্য';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' শত ';
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
                <title>Convert numbers to text (Bengali) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Bengali)</h1>

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
