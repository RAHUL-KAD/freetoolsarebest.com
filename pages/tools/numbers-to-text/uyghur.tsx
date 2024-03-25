import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToUyghurText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'نۆل',
            1: 'بىر',
            2: 'ئىككى',
            3: 'ئۈچ',
            4: 'تۆت',
            5: 'بەش',
            6: 'ئالتە',
            7: 'يەتتە',
            8: 'سەككىز',
            9: 'توققۇز',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'ئون',
            11: 'ئون بىر',
            12: 'ئون ئىككى',
            13: 'ئون ئۈچ',
            14: 'ئون تۆت',
            15: 'ئون بەش',
            16: 'ئون ئالتە',
            17: 'ئون يەتتە',
            18: 'ئون سەككىز',
            19: 'ئون توققۇز',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'ئىككى ئون',
            3: 'ئۈچ ئون',
            4: 'تۆت ئون',
            5: 'بەش ئون',
            6: 'ئالتە ئون',
            7: 'يەتتە ئون',
            8: 'سەككىز ئون',
            9: 'توققۇز ئون',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' مىللىون',
            6: ' مىليارد',
            9: ' تىرىللىون',
            12: ' تىرىللىارد',
            15: ' كۋادرىللىون',
            18: ' كۋادرىللىارد',
        };
    
        if (num === 0) {
            return 'نۆل';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' يۈز ';
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
            setText(convertToUyghurText(value));
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
                <title>Convert numbers to text (Uyghur) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Uyghur)</h1>

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
