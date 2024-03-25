import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'शून्य',
            1: 'एक',
            2: 'द्वि',
            3: 'त्रि',
            4: 'चतुर्',
            5: 'पञ्च',
            6: 'षट्',
            7: 'सप्त',
            8: 'अष्ट',
            9: 'नव',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'दश',
            11: 'एकादश',
            12: 'द्वादश',
            13: 'त्रयोदश',
            14: 'चतुर्दश',
            15: 'पञ्चदश',
            16: 'षोडश',
            17: 'सप्तदश',
            18: 'अष्टादश',
            19: 'एकोनविंशति',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'विंशति',
            3: 'त्रिंशति',
            4: 'चत्वारिंशति',
            5: 'पञ्चाशत्',
            6: 'षट्तिः',
            7: 'सप्ततिः',
            8: 'अष्टतिः',
            9: 'नवतिः',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' सहस्र',
            6: ' लक्ष',
            9: ' कोटि',
            12: ' अर्बुद',
            15: ' खर्व',
            18: ' शङ्कु',
        };
    
        if (num === 0) {
            return 'शून्य';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'शतम् ';
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
                <title>Convert numbers to text (sanskrit) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (sanskrit)</h1>

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
