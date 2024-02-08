import Document, { Head, Html, Main, NextScript } from "next/document";
// Importing the Google Analytics Measurement ID from the environment variable
const gtag = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;

const isProd = process.env.NODE_ENV === "production";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta name="description" content="freetoolsarebest | Use all the tools for free" />
          <meta property="og:site_name" content="freetoolsarebest.com" />
          <meta
            property="og:description"
            content="freetoolsarebest | Use all the tools for free"
          />
          <meta property="og:title" content="freetoolsarebest | Use all the tools for free" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="freetoolsarebest | Use all the tools for free" />
          <meta
            name="twitter:description"
            content="freetoolsarebest | Use all the tools for free"
          />
          <script async src="https://tally.so/widgets/embed.js"></script>
          {/* Add Image here for a preview */}
          <meta
            property="og:image"
            content=""
          />
          <meta
            name="twitter:image"
            content=""
          />

          {isProd && (
            <>
              {/* Google Analytics Measurement ID*/}
              <script async src={gtag} />
              {/* {/ Inject the GA tracking code with the Measurement ID /} */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_path: window.location.pathname
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
