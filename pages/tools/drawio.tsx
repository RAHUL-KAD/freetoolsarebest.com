import { DrawIoEmbed, DrawIoEmbedRef } from 'react-drawio';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

function App() {
    const [imgData, setImgData] = useState<string | null>(null);
    const drawioRef = useRef<DrawIoEmbedRef>(null);

    const Allexport = () => {
        if (drawioRef.current) {
            drawioRef.current.exportDiagram({
                format: 'xmlsvg'
            });
        }
    };

    return (
        <div className='h-screen'>

            <Head>
                <title>Draw.io Embedded UI | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <DrawIoEmbed
                ref={drawioRef}
                onExport={(data) => setImgData(data.data)}
            />

            {imgData && <img src={imgData} />}
        </div>
    );
}

export default App;