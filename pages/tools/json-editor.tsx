import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import Header from '../../components/Header';
import Head from 'next/head';

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState<string>("None");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewJSON, setViewJSON] = useState<boolean>(false);
  const [editorWidth, setEditorWidth] = useState<string>('600px');
  const [editorHeight, setEditorHeight] = useState<string>('400px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setEditorWidth('90vw');
        setEditorHeight('60vh');
      } else {
        setEditorWidth('700px');
        setEditorHeight('500px');
      }
    };

    handleResize(); // Initial call to set dimensions based on screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = reader.result as string;
          setJsonData(data);
          setEditorValue(data);
          setFileName(file.name);
          setError(null);
          setViewJSON(true)
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadJsonFile = () => {
    if (jsonData && fileName) {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "ftools__" + fileName;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const copyToClipboard = () => {
    if (editorValue) {
      navigator.clipboard.writeText(editorValue)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => alert('Failed to copy JSON data'));
    }
  };

  const validateJSON = (value: string) => {
    try {
      JSON.parse(value);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof SyntaxError) {
        setError(err.message);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  const handlePasteJSON = async () => {
    try {
        const clipboardData = await navigator.clipboard.readText();
        setJsonData(clipboardData);
        setEditorValue(clipboardData);
        setFileName(null);
        setError(null); 
        setViewJSON(true);
    } catch (error) {
        console.error('Failed to paste XML:', error);
    }
};

  return (
    <div className="flex flex-col items-center justify-center mb-10">

      <Head>
        <title>JSON Editor and Viewer | freetoolsarebest </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {!viewJSON && (
        <div className='mt-10 mb-5'>
          <h1 className="font-display mx-auto max-w-4xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
            <span className="relative text-[#333] whitespace-wrap">
              <span className="relative mr-2">
                JSON Editor
              </span>
            </span>
          </h1>
        </div>
      )}

      <div className='mt-5 flex flex-col items-center justify-center'>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="mb-4 px-3 py-2 border border-gray-300 rounded lg:w-[35vw] w-[90vw]"
        />

        {!viewJSON && (
          <div>
            <p className='text-center mt-5 mb-5'>OR</p>
            <button
              onClick={handlePasteJSON}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 lg:w-[15vw] w-[90vw"
            >
              Paste JSON
            </button>
          </div>
        )}
      </div>
      {jsonData && (
        <>
          <AceEditor
            mode="json"
            theme="github"
            value={editorValue}
            width={editorWidth}
            height={editorHeight}
            onChange={(newValue) => {
              setEditorValue(newValue);
              validateJSON(newValue);
            }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            className="w-full h-96 mb-4"
          />
          {error && <div className="text-red-500 mb-4 w-[90vw]">{error}</div>}
          <div className="flex gap-4">
            <button
              onClick={downloadJsonFile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download JSON
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isCopied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

