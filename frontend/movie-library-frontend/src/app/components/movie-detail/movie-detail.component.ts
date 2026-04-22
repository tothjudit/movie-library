import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Invalid movie id.';
      return;
    }

    this.isLoading = true;
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to load movie details.';
        this.isLoading = false;
      }
    });
  }

  getGenres(): string[] {
    return (this.movie?.genre || '')
      .split(',')
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0);
  }

  getStars(): number[] {
    const rounded = Math.max(0, Math.min(5, Math.round(this.movie?.rating || 0)));
    return Array.from({ length: rounded }, (_, index) => index + 1);
  }

  onPosterError(): void {
    if (!this.movie) {
      return;
    }

    this.movie.posterUrl = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80';
  }
}
