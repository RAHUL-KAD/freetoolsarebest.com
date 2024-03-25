import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'нуль',
            1: 'один',
            2: 'два',
            3: 'три',
            4: 'чотири',
            5: 'п\'ять',
            6: 'шість',
            7: 'сім',
            8: 'вісім',
            9: 'дев\'ять',
        };

        const teensMap: { [key: number]: string } = {
            10: 'десять',
            11: 'одинадцять',
            12: 'дванадцять',
            13: 'тринадцять',
            14: 'чотирнадцять',
            15: 'п\'ятнадцять',
            16: 'шістнадцять',
            17: 'сімнадцять',
            18: 'вісімнадцять',
            19: 'дев\'ятнадцять',
        };

        const tensMap: { [key: number]: string } = {
            2: 'двадцять',
            3: 'тридцять',
            4: 'сорок',
            5: 'п\'ятдесят',
            6: 'шістдесят',
            7: 'сімдесят',
            8: 'вісімдесят',
            9: 'дев\'яносто',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' тисяч',
            6: ' мільйонів',
            9: ' мільярдів',
            12: ' трильйонів',
            15: ' квадрильйонів',
            18: ' квінтильйонів',
        };

        if (num === 0) {
            return 'нуль';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'сто ';
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
                <title>Convert numbers to text (Ukrainian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Ukrainian)</h1>

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
