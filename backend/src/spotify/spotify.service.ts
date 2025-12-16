import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface SpotifyArtist {
  id: string;
  name: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
  is_playable: boolean;
}

@Injectable()
export class SpotifyService {
  private token: string | null = null;
  private tokenExpires = 0;

  private async getToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpires) return this.token;

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = (await res.json()) as { access_token: string; expires_in: number };
    this.token = data.access_token;
    this.tokenExpires = Date.now() + data.expires_in * 1000;
    return this.token;
  }

  async getArtistTopTracksByName(artistName: string) {
    const token = await this.getToken();

    // Buscar artista por nombre
    const searchRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const searchData = (await searchRes.json()) as { artists: { items: SpotifyArtist[] } };
    const artist = searchData.artists.items[0];
    if (!artist) return [];

    const artistId = artist.id;

    // Obtener top tracks
    const topTracksRes = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const topTracksData = (await topTracksRes.json()) as { tracks: SpotifyTrack[] };

    // Devolver máximo 5 canciones con preview o external url
    return topTracksData.tracks.slice(0, 5).map((t) => ({
      id: t.id,
      nombre: t.name,
      imagen: t.album.images[0]?.url ?? '',
      preview: t.preview_url ?? t.external_urls.spotify ?? '', // si no hay preview, usar link externo
      hasPreview: !!t.preview_url, // para saber si se puede reproducir directamente
    }));
  }
}