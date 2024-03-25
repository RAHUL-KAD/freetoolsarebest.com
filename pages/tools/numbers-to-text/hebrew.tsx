import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'אפס',
            1: 'אחד',
            2: 'שניים',
            3: 'שלושה',
            4: 'ארבעה',
            5: 'חמישה',
            6: 'ששה',
            7: 'שבעה',
            8: 'שמונה',
            9: 'תשעה',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'עשרה',
            11: 'אחת עשרה',
            12: 'שתיים עשרה',
            13: 'שלוש עשרה',
            14: 'ארבע עשרה',
            15: 'חמש עשרה',
            16: 'שש עשרה',
            17: 'שבעה עשרה',
            18: 'שמונה עשרה',
            19: 'תשעה עשרה',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'עשרים',
            3: 'שלושים',
            4: 'ארבעים',
            5: 'חמישים',
            6: 'שישים',
            7: 'שבעים',
            8: 'שמונים',
            9: 'תשעים',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' אלף',
            6: ' מיליון',
            9: ' מיליארד',
            12: ' ביליון',
            15: ' טריליון',
            18: ' קווינטיליון',
        };
    
        if (num === 0) {
            return 'אפס';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' מאות ';
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
                <title>Convert numbers to text (Hebrew) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Hebrew)</h1>

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
