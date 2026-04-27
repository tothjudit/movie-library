import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchTerm = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  readonly pageSize = 4;
  currentPage = 1;
  readonly skeletonItems = Array.from({ length: 8 }, (_, index) => index);

  constructor(
    private readonly movieService: MovieService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = (params.get('q') || '').trim().toLowerCase();
      this.currentPage = 1;
    });
    this.loadMovies();
  }

  get filteredMovies(): Movie[] {
    if (!this.searchTerm) {
      return this.movies;
    }

    return this.movies.filter((movie) => movie.title.toLowerCase().includes(this.searchTerm));
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredMovies.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get displayedMovies(): Movie[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredMovies.slice(start, start + this.pageSize);
  }

  getGenres(movie: Movie): string[] {
    return (movie.genre || '')
      .split(',')
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0);
  }

  getStarArray(rating: number | null | undefined): number[] {
    const rounded = Math.max(0, Math.min(5, Math.round(rating || 0)));
    return Array.from({ length: rounded }, (_, index) => index + 1);
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.currentPage = 1;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to load movies. Please try again.';
        this.toastService.error(this.errorMessage);
        this.isLoading = false;
      }
    });
  }

  onDelete(movie: Movie): void {
    if (!movie.id) {
      return;
    }

    const confirmed = window.confirm(`Delete "${movie.title}"?`);
    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.movieService.deleteMovie(movie.id).subscribe({
      next: () => {
        this.movies = this.movies.filter((item) => item.id !== movie.id);
        this.currentPage = Math.min(this.currentPage, this.totalPages);
        this.successMessage = 'Movie deleted successfully.';
        this.toastService.success(this.successMessage);
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to delete movie.';
        this.toastService.error(this.errorMessage);
      }
    });
  }

  onPosterError(movie: Movie): void {
    movie.posterUrl = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80';
  }

  goToPreviousPage(): void {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage -= 1;
  }

  goToNextPage(): void {
    if (this.currentPage >= this.totalPages) {
      return;
    }

    this.currentPage += 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;
  }
}
