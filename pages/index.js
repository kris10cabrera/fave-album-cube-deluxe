import Head from 'next/head'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Button from '../components/Button';
import fetcher from '../lib/fetcher';


export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [page, setPagePosition] = useState({ x: 200, y: 600 });
  const [user, fetchUser] = useState(null);

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

  const albums = user ? user : data.uniqueAlbums;
  const names = ['top', 'side', 'cover', 'spine', 'back', 'bottom'];

  let cubeStyle = {
    transform: `rotateX(${position.y}deg) rotateY(${position.x}deg) `,
    left: `${page.x}px`,
    top: `${page.y}px`
  }
  return (
    <div >
      <Head>
        <title>ur fave albums by kris10cabrera</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <header>
          <Button fetchUser={fetchUser} />
          <h1>here is a cube of {user ? 'your' : 'my'} favorite albums</h1>
          <span className="byline">*of the last 4 weeks. made by <a href="https://www.kristencabrera.com/">kris10cabrera</a> using the <span style={{ whiteSpace: 'nowrap' }}>Spotify API & Next.js</span></span>
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
