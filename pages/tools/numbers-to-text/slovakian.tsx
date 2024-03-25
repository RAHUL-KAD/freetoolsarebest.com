import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToSlovakText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nula',
            1: 'jeden',
            2: 'dva',
            3: 'tri',
            4: 'štyri',
            5: 'päť',
            6: 'šesť',
            7: 'sedem',
            8: 'osem',
            9: 'deväť',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'desať',
            11: 'jedenásť',
            12: 'dvanásť',
            13: 'trinásť',
            14: 'štrnásť',
            15: 'pätnásť',
            16: 'šestnásť',
            17: 'sedemnásť',
            18: 'osemnásť',
            19: 'deväťnásť',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dvadsať',
            3: 'tridsať',
            4: 'štyridsať',
            5: 'päťdesiat',
            6: 'šesťdesiat',
            7: 'sedemdesiat',
            8: 'osemdesiat',
            9: 'deväťdesiat',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' tisíc',
            6: ' milión',
            9: ' miliarda',
            12: ' bilión',
            15: ' biliarda',
            18: ' trilión',
        };
    
        if (num === 0) {
            return 'nula';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'sto ';
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
            setText(convertToSlovakText(value));
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
                <title>Convert numbers to text (Slovakian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Slovakian)</h1>

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
