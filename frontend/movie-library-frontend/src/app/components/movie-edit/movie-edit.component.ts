import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { GenreService } from '../../services/genre.service';
import { MovieService } from '../../services/movie.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  isLoading = false;
  isGenresLoading = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  genresErrorMessage = '';
  genres: string[] = [];
  private movieId = '';

  movieForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    year: [null as number | null, [Validators.required, Validators.min(1888)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    director: [''],
    genre: [[] as string[]],
    rating: [null as number | null],
    posterUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly genreService: GenreService,
    private readonly toastService: ToastService,
    private readonly movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadGenres();

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Invalid movie id.';
      return;
    }

    this.movieId = id;
    this.isLoading = true;

    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movieForm.patchValue({
          title: movie.title,
          year: movie.year,
          description: movie.description ?? '',
          director: movie.director ?? '',
          genre: (movie.genre || '')
            .split(',')
            .map((genre) => genre.trim())
            .filter((genre) => genre.length > 0),
          rating: movie.rating ?? null,
          posterUrl: movie.posterUrl ?? ''
        });
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to load movie.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid || !this.movieId) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: Movie = {
      title: this.movieForm.value.title ?? '',
      year: Number(this.movieForm.value.year),
      description: this.movieForm.value.description ?? '',
      director: this.movieForm.value.director ?? '',
      genre: (this.movieForm.value.genre ?? []).join(', '),
      rating: this.movieForm.value.rating === null || this.movieForm.value.rating === undefined
        ? null
        : Number(this.movieForm.value.rating),
      posterUrl: this.movieForm.value.posterUrl ?? ''
    };

    this.movieService.updateMovie(this.movieId, payload).subscribe({
      next: () => {
        this.successMessage = 'Movie updated successfully.';
        this.toastService.success(this.successMessage);
        this.isSubmitting = false;
        this.router.navigate(['/movies', this.movieId]);
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to update movie.';
        this.toastService.error(this.errorMessage);
        this.isSubmitting = false;
      }
    });
  }

  private loadGenres(): void {
    this.isGenresLoading = true;
    this.genresErrorMessage = '';

    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
        this.isGenresLoading = false;
      },
      error: () => {
        this.genresErrorMessage = 'Failed to load genres.';
        this.isGenresLoading = false;
      }
    });
  }
}
