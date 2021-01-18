import Head from 'next/head'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';


export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [page, setPagePosition] = useState({ x: 200, y: 600 });

  const moveAlbums = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setPagePosition({ x: e.pageX, y: e.pageY });
    if (window.innerWidth < 500) {
      setPosition({ x: ((x - window.innerWidth / 2) * 2), y: ((y - window.innerHeight / 2) * 2) });
    } else {
      setPosition({ x: ((x - window.innerWidth / 2) * .5), y: ((y - window.innerHeight / 2) * .5) });
    };
  };

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", moveAlbums);
    document.addEventListener("touchmove", moveAlbums);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", moveAlbums);
    document.removeEventListener("touchmove", moveAlbums);
  };
  const { data } = useSWR('/api/recentlyPlayed', fetcher);
  if (!data) {
    return null;
  }

  const albums = data.uniqueAlbums;
  const names = ['top', 'side', 'cover', 'spine', 'back', 'bottom'];

  let cubeStyle = {
    transform: `rotateX(${position.y}deg) rotateY(${position.x}deg) `,
    left: `${page.x}px`,
    top: `${page.y}px`
  }
  return (
    <div >
      <Head>
        <title>fave album cube by kris10cabrera</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <title>fave album cube by kris10cabrera</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="title" content="favorite album cube, deluxe" />
        <meta name="description" content="my favorite albums of the last 4 weeks. made by kris10cabrera using the spotify api"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fave-album-cube-deluxe.vercel.app/" />
        <meta property="og:title" content="favorite album cube, deluxe" />
        <meta property="og:description" content="my favorite albums of the last 4 weeks. by kris10cabrera using the spotify api"/>
        <meta property="og:image" content="https://fave-album-cube-deluxe.vercel.app/meta.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fave-album-cube-deluxe.vercel.app/" />
        <meta property="twitter:title" content="favorite album cube, deluxe" />
        <meta property="twitter:description" content="my favorite albums of the last 4 weeks. by kris10cabrera using the spotify api"/>
        <meta property="twitter:image" content="https://fave-album-cube-deluxe.vercel.app/meta.jpg" />
      </Head>
      <main>
        <header>
          <h1>here is a cube of my favorite albums</h1>
          <span>*of the last 4 weeks. made by <a href="https://www.kristencabrera.com/">kris10cabrera</a> using the spotify api</span>
        </header>
        <section className="parent">
          <section className="cube" style={cubeStyle}>
            {albums.map((album, index) => {
              let albumStyle = {
                backgroundImage: 'url(' + album.images[0].url + ')',
              };
              return <div key={album.album} className={`face ${names[index]}`} style={albumStyle}></div>
            })}
          </section>
        </section>
      </main>
    </div>
  )
}
