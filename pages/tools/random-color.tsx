import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import Header from '../../components/Header';
import Head from 'next/head';

// https://chat.openai.com/share/917e89aa-3fb7-4cb2-af27-1ebd2e590da2

const App: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);


  useEffect(() => {
    generateRandomColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomColors = () => {
    const newColors = Array.from({ length: 5 }, () => randomColor({ format: 'hex' }));
    setColors(newColors);
  };

  const copyColorValue = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000); // Reset copied message after 2 seconds
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      generateRandomColors();
    }
  };


  return (
    <div className="w-[100%] flex flex-col items-center justify-center py-2">
      <Head>
        <title>Random Color Generator | freetoolsarebest </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-green-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <Header />
      <div id='colors' className="flex justify-center items-center min-h-screen " tabIndex={0} onKeyDown={handleKeyDown}>
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-2 text-center">Random Colors</h1>
          <p className='text-center mb-4 text-sm'>Refrensh to change colors</p>
          <div className="flex flex-wrap gap-4 justify-center h-[30rem]">
            {colors.map((color, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between bg-white rounded p-4 shadow"
                style={{ backgroundColor: color, width: '200px' }}
              >
                <div>
                  <div
                    onClick={() => copyColorValue(color, index)}
                    style={{ cursor: 'pointer' }}>
                    <span
                      className="text-lg text-center font-semibold"
                    >{color}
                    </span>
                  </div>
                  {copiedIndex === index && <p className="mt-2 text-center text-sm">Copied!</p>}

                </div>
                {/* <span className="text-lg font-semibold text-gray-700">{randomColor({ format: 'rgb' })}</span> */}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
