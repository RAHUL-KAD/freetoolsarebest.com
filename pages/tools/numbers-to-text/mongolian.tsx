import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToMongolianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'тэг',
            1: 'нэг',
            2: 'хоёр',
            3: 'гурав',
            4: 'дөрөв',
            5: 'тав',
            6: 'зургаа',
            7: 'долоо',
            8: 'найм',
            9: 'ес',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'арван',
            11: 'арван нэг',
            12: 'арван хоёр',
            13: 'арван гурав',
            14: 'арван дөрөв',
            15: 'арван тав',
            16: 'арван зургаа',
            17: 'арван долоо',
            18: 'арван найм',
            19: 'арван ес',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'хорин',
            3: 'гучин',
            4: 'дөчин',
            5: 'тавин',
            6: 'жаран',
            7: 'далан',
            8: 'наян',
            9: 'ёс',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'тэн',
            6: 'мянга',
            9: 'сая',
            12: 'тэрбум',
            15: 'идэр',
            18: 'зуун',
        };
    
        if (num === 0) {
            return 'тэг';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' зуун ';
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
            setText(convertToMongolianText(value));
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
                <title>Convert numbers to text (Mongolian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Mongolian)</h1>

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
