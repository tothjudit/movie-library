import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';

interface TvMazeShow {
  genres?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genresCache$?: Observable<string[]>;

  constructor(private readonly http: HttpClient) {}

  getGenres(): Observable<string[]> {
    if (!this.genresCache$) {
      this.genresCache$ = this.http
        .get<TvMazeShow[]>('https://api.tvmaze.com/shows?page=1')
        .pipe(
          map((shows) => this.extractGenres(shows)),
          catchError((error) => {
            console.error('[GenreService] Failed to fetch external genres', error);
            return of([
              'Action',
              'Adventure',
              'Animation',
              'Comedy',
              'Crime',
              'Drama',
              'Fantasy',
              'Horror',
              'Mystery',
              'Romance',
              'Sci-Fi',
              'Thriller'
            ]);
          }),
          shareReplay(1)
        );
    }

    return this.genresCache$;
  }

  private extractGenres(shows: TvMazeShow[]): string[] {
    const genreSet = new Set<string>();

    for (const show of shows) {
      for (const genre of show.genres ?? []) {
        if (genre?.trim()) {
          genreSet.add(genre.trim());
        }
      }
    }

    return [...genreSet].sort((a, b) => a.localeCompare(b));
  }
}
