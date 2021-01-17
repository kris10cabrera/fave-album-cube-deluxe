import Head from 'next/head'
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';


export default function Home() {
  const { data } = useSWR('/api/recentlyPlayed', fetcher);
  if (!data) {
    return null;
  }
  const albums = data.uniqueAlbums;

  const names = ['cover', 'spine', 'back', 'top', 'side', 'bottom'];
  return (
    <div >
      <Head>
        <title>fave album cube, deluxe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        album
        <section className="parent">
          <section className="cube">
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
