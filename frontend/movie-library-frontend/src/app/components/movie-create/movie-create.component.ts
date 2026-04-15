import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { GenreService } from '../../services/genre.service';
import { MovieService } from '../../services/movie.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  isSubmitting = false;
  isGenresLoading = false;
  genresErrorMessage = '';
  successMessage = '';
  errorMessage = '';
  genres: string[] = [];

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
    private readonly genreService: GenreService,
    private readonly movieService: MovieService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
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

    this.movieService.createMovie(payload).subscribe({
      next: () => {
        this.successMessage = 'Movie created successfully.';
        this.toastService.success(this.successMessage);
        this.isSubmitting = false;
        this.movieForm.reset();
        this.router.navigate(['/movies']);
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to create movie.';
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
