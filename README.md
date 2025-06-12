#  CineMap - Frontend Angular

Proyecto realizado en Angular, que consume una API, para mostrar Peliculas Filmadas en San Francisco

## Versiones utilizadas

- **Angular CLI**: 20.0.1  
- **Node.js**: 22.16.0  
- **npm**: 11.4.1  

---

## Instalación

1. Cloná el repositorio si no lo hiciste:

git clone https://github.com/RodrigoDiaz24/MoviesChallenge.git
cd MoviesChallenge/Frontend


2. Instalá las dependencias:

npm install
npm install leaflet bootstrap

Ya estan en el repositorio, pero para que funcionen los estilados hay que referenciarlos en `angular.json` o `src/styles.css`:
3. Ejecutá la aplicación en modo desarrollo:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/leaflet/dist/leaflet.css",
  "src/styles.css"
]


Ejecutar ng serve y Luego abrí tu navegador en:

```
http://localhost:4200
```

## Funcionalidad

- Selección de zonas predefinidas de San Francisco
- Búsqueda por radio
- Visualización de locaciones de películas en un mapa interactivo con Leaflet
