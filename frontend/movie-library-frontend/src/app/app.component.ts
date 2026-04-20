import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Movie {
  id: string;
  title: string;
  director: string;
  genre: string;
  releaseYear: number;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'movie-library-frontend';
  movies: Movie[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Movie[]>('http://localhost:8080/api/Movies')
      .subscribe({
        next: (data) => {
          this.movies = data;
        },
        error: (error) => {
          console.error('Error loading movies:', error);
        }
      });
  }
}