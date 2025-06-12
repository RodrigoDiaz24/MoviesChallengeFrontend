import { Component } from '@angular/core';
import { Search } from './components/search/search';
import { Map } from './components/map/map';
import { CommonModule } from '@angular/common';
import { MoviesService, Movie } from './services/movies.service';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Search, Map, CommonModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'MoviesChallengeFrontend';
  coordinates: { lat: number; lon: number; rad: number; } | null = null;
  movies: Movie[] = [];
  selectedMovie: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadAllMovies(); 
  }

  onCoordinatesFound(coords: { lat: number; lon: number; rad: number; }) {
    this.coordinates = coords;
    this.movies = []; 
    
    this.moviesService.getNearMovies(coords.lat, coords.lon, coords.rad).subscribe({
      next: (res) => {
        this.movies = res;
      },
      error: (err) => {
        console.error('Error al obtener cines:', err);
        this.movies = [];
      }
    });
  }

  loadAllMovies() {
  this.selectedMovie = '';
  this.coordinates = null;

  this.moviesService.getAllMovies().subscribe({
    next: (res) => this.movies = res,
    error: () => this.movies = []
  });
}
}
