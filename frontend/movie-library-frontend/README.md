# Frontend

## Áttekintés
Ez a Movie Library projekt frontend része.  
Angular technológiával készült, és a backend ASP.NET Core Web API-hoz kapcsolódik.

A frontend feladata jelenleg:
- a Movie Library kezdőoldal megjelenítése
- a backendből érkező filmek lekérdezése
- a filmek listájának megjelenítése a felhasználói felületen

## Használt technológiák
- Angular 17
- TypeScript
- HTML
- CSS

## Projektstruktúra
- `movie-library-frontend/` – az Angular alkalmazás fő mappája
- `movie-library-frontend/src/app/app.component.ts` – fő komponens logika
- `movie-library-frontend/src/app/app.component.html` – fő nézet
- `movie-library-frontend/src/app/app.component.css` – fő stílusfájl

## Követelmények
A frontend futtatása előtt az alábbiak szükségesek:
- telepített Node.js
- telepített npm
- telepített Angular CLI

## A frontend indítása
Lépj be az Angular projekt mappájába:

```bash
cd frontend/movie-library-frontend