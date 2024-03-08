
import type { AppProps } from "next/app";
import "../styles/globals.css";
import ErrorBoundary from "./ErrorBoundry";
import React, { lazy } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// Import the styles provided by the react-pdf-viewer packages
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Footer = lazy(() => import('../components/Footer'));

function MyApp({ Component, pageProps }: AppProps) {

  // // Integrate page tracking for google analytics

  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: any) => {
  //     window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
  //       page_path: url,
  //     });
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   }
  // }, [router.events]);
  
  return (
    <>
      <ErrorBoundary fallback="There was an error while processing">
      <Component {...pageProps} />
      {/* <Footer /> */}
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
