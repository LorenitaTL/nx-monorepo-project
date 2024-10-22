import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <body></body>
    </>
  );
}

export default CustomApp;
