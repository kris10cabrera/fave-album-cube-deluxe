import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="title" content="favorite album cube, deluxe" />
          <meta name="description" content="my favorite albums of the last 4 weeks. made by kris10cabrera using the spotify api" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://fave-album-cube-deluxe.vercel.app/" />
          <meta property="og:title" content="favorite album cube, deluxe" />
          <meta property="og:description" content="my favorite albums of the last 4 weeks. by kris10cabrera using the spotify api" />
          <meta property="og:image" content="https://fave-album-cube-deluxe.vercel.app/meta.jpg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://fave-album-cube-deluxe.vercel.app/" />
          <meta property="twitter:title" content="favorite album cube, deluxe" />
          <meta property="twitter:description" content="my favorite albums of the last 4 weeks. by kris10cabrera using the spotify api" />
          <meta property="twitter:image" content="https://fave-album-cube-deluxe.vercel.app/meta.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument