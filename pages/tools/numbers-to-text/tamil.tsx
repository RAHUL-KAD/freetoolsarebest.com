import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'பூஜ்யம்',
            1: 'ஒன்று',
            2: 'இரண்டு',
            3: 'மூன்று',
            4: 'நான்கு',
            5: 'ஐந்து',
            6: 'ஆறு',
            7: 'ஏழு',
            8: 'எட்டு',
            9: 'ஒன்பது',
        };

        const teensMap: { [key: number]: string } = {
            10: 'பத்து',
            11: 'பதினொன்று',
            12: 'பன்னிரண்டு',
            13: 'பன்னிரண்டு மூன்று',
            14: 'பன்னிரண்டு நான்கு',
            15: 'பன்னிரண்டு ஐந்து',
            16: 'பன்னிரண்டு ஆறு',
            17: 'பன்னிரண்டு ஏழு',
            18: 'பன்னிரண்டு எட்டு',
            19: 'பன்னிரண்டு ஒன்பது',
        };

        const tensMap: { [key: number]: string } = {
            2: 'இருபது',
            3: 'முப்பது',
            4: 'நாற்பது',
            5: 'ஐம்பது',
            6: 'அறுபது',
            7: 'எழுபது',
            8: 'எண்பது',
            9: 'தொண்ணூறு',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' ஆயிரம்',
            6: ' லட்சம்',
            9: ' கோடி',
            12: ' ஆரப்பரிமிக்கம்',
            15: ' நிலமை',
            18: ' கோடிலட்சம்',
        };

        if (num === 0) {
            return 'பூஜ்யம்';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' நூறு ';
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
                <title>Convert numbers to text (tamil) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (tamil)</h1>

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
