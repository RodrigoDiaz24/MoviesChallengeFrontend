import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { Movie } from '../../services/movies.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements AfterViewInit, OnChanges{
  @Input() lat: number = -34.6037;
  @Input() lng: number = -58.3816;
  @Input() movies: Movie[] = [];

  private map: L.Map | null = null;
  private markers: L.Marker[] = [];

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cinemas'] && this.map) {
    this.clearMarkers();
    this.addCinemaMarkers();
    this.fitToMarkers(); 
  }
  }

  private initMap(): void {
    this.map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.addCinemaMarkers();

    setTimeout(() => {
      this.fitToMarkers();
    }, 0);  
  }

  private setCenter(): void {
    this.map?.setView([this.lat, this.lng], 13);
  }

  private addCinemaMarkers(): void {
    this.movies.forEach(movie => {
      const marker = L.marker([movie.latitude, movie.longitude])
        .addTo(this.map!)
        .bindPopup(`
          <div class="popup-content">
            <div class="movie-title">${movie.title}</div>
            <div><strong>Año:</strong> ${movie.release_Year ?? 'Desconocido'}</div>
            <div><strong>Ubicación:</strong> ${movie.locations ?? 'N/D'}</div>
            <div><strong>Productora:</strong> ${movie.production_Company ?? 'N/D'}</div>
          </div>
        `);
      this.markers.push(marker);
    });
  }

  private fitToMarkers(): void {
    if (!this.map || this.movies.length === 0) return;

    const bounds = L.latLngBounds(
      this.movies.map(c => L.latLng(c.latitude, c.longitude))
    );

    this.map.fitBounds(bounds, { padding: [50, 50] });
    console.log('Centrando mapa en markers:', this.movies.length);
  } 

  private clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}
