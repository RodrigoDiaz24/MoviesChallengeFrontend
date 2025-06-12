import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  title: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  release_Year?: number;
  locations?: string;
  production_Company?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://localhost:7013/api/movies'; 

  constructor(private http: HttpClient) {}

  getNearMovies(lat: number, lng: number, radius: number = 1): Observable<Movie[]> {
    const url = `${this.apiUrl}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`;
    return this.http.get<Movie[]>(url);
  }

  getAllMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(`${this.apiUrl}`);
}
}