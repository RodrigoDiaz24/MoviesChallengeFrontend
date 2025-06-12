import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  address: string = '';
  radius: number = 1;
  predefinedPoints = [
  { label: 'Golden Gate Park', lat: 37.7694, lon: -122.4862 },
  { label: 'Union Square', lat: 37.7879, lon: -122.4075 },
  { label: 'Fisherman\'s Wharf', lat: 37.8080, lon: -122.4177 },
  { label: 'Mission District', lat: 37.7599, lon: -122.4148 },
  { label: 'Presidio', lat: 37.7989, lon: -122.4662 }
];

selectedPointLabel = '';
  coordinates: { lat: number; lon: number;} | null = null;

  @Output() coordinatesFound = new EventEmitter<{ lat: number; lon: number; rad: number }>();

  isLoading: boolean = false;

  constructor() {}

  onSearch() {
    const selected = this.predefinedPoints.find(p => p.label === this.selectedPointLabel);
    if (!selected) return;

    this.coordinatesFound.emit({
      lat: selected.lat,
      lon: selected.lon,
      rad: this.radius
    });
  }
}
