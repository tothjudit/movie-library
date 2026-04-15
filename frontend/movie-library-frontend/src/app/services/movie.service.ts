import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiUrl = '/api/movies';
  private readonly fallbackPosterUrl = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';

  constructor(private readonly http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<ApiMovie[]>(this.apiUrl).pipe(
      map((movies) => movies.map((movie) => this.fromApiMovie(movie))),
      catchError((error) => this.handleHttpError(error))
    );
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<ApiMovie>(`${this.apiUrl}/${id}`).pipe(
      map((movie) => this.fromApiMovie(movie)),
      catchError((error) => this.handleHttpError(error))
    );
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<ApiMovie>(this.apiUrl, this.toApiMovie(movie)).pipe(
      map((createdMovie) => this.fromApiMovie(createdMovie)),
      catchError((error) => this.handleHttpError(error))
    );
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<ApiMovie>(`${this.apiUrl}/${id}`, this.toApiMovie(movie)).pipe(
      map((updatedMovie) => this.fromApiMovie(updatedMovie)),
      catchError((error) => this.handleHttpError(error))
    );
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleHttpError(error))
    );
  }

  private fromApiMovie(apiMovie: ApiMovie): Movie {
    return {
      id: apiMovie.id,
      title: apiMovie.title,
      description: apiMovie.description ?? '',
      year: apiMovie.releaseYear,
      director: apiMovie.director,
      genre: apiMovie.genre,
      rating: apiMovie.rating ?? null,
      posterUrl: apiMovie.posterUrl || this.fallbackPosterUrl
    };
  }

  private toApiMovie(movie: Movie): ApiMovie {
    return {
      id: movie.id,
      title: movie.title.trim(),
      releaseYear: Number(movie.year),
      description: movie.description?.trim() ?? '',
      director: movie.director?.trim() ?? 'Unknown Director',
      genre: movie.genre?.trim() ?? 'Unclassified',
      rating: movie.rating ?? null,
      posterUrl: movie.posterUrl?.trim() || this.fallbackPosterUrl
    };
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    console.error('[MovieService] API request failed', {
      url: error.url,
      status: error.status,
      payload: error.error
    });

    if (error.status === 0) {
      return throwError(() => new Error('Unable to connect to the API server.'));
    }

    const message = typeof error.error === 'string'
      ? error.error
      : error.error?.message || error.error?.detail || error.error?.title;

    const isDevProxyApiError =
      error.status === 500 &&
      Boolean(error.url?.includes('/api/')) &&
      Boolean(error.url?.includes('localhost:4200'));

    if (isDevProxyApiError) {
      return throwError(
        () => new Error('Backend API is unreachable. Start backend on http://127.0.0.1:5263 and ensure MongoDB is running on 127.0.0.1:27017.')
      );
    }

    if (error.status >= 500 && !message) {
      return throwError(() => new Error('Server error. Please check backend logs and database connectivity.'));
    }

    return throwError(() => new Error(message || `Request failed (${error.status}).`));
  }
}

interface ApiMovie {
  id?: string;
  title: string;
  description?: string | null;
  releaseYear: number;
  director?: string;
  genre?: string;
  rating?: number | null;
  posterUrl?: string | null;
}
