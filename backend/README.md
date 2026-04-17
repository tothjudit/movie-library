# Backend

## Áttekintés
Ez a Movie Library projekt backend API-ja.  
ASP.NET Core Web API technológiával készült, és MongoDB adatbázist használ.

Az API az alábbi CRUD műveleteket támogatja filmek kezelésére:
- összes film lekérdezése
- egy film adatainak megjelenítése
- új film létrehozása
- meglévő film módosítása
- film törlése

## Használt technológiák
- ASP.NET Core 8 Web API
- C#
- MongoDB
- Docker
- Swagger / OpenAPI

## Projektstruktúra
- `MovieLibrary.Api/Controllers/MoviesController.cs` – API végpontok
- `MovieLibrary.Api/Models/Movie.cs` – film modell
- `MovieLibrary.Api/Models/MongoDbSettings.cs` – MongoDB beállítási modell
- `MovieLibrary.Api/Services/MovieService.cs` – MongoDB adatkezelő service
- `MovieLibrary.Api/Program.cs` – service regisztráció és alkalmazásindítás
- `MovieLibrary.Api/MovieLibrary.Api.http` – mintakérések teszteléshez

## Követelmények
A backend futtatása előtt az alábbiak szükségesek:
- telepített .NET 8 SDK
- telepített és futó Docker Desktop

## MongoDB indítása Dockerben
A MongoDB az alábbi paranccsal indítható:

```bash
docker run -d --name movie-library-mongo -p 27017:27017 mongo

Ha a konténer már létezik, akkor elég ezt futtatni:
```bash
docker start movie-library-mongo

A backend indítása

Lépj be a backend projekt mappájába:
```bash
cd backend/MovieLibrary.Api

Indítsd el az alkalmazást:
```bash
dotnet run

Sikeres indulás után a backend az alábbi címen érhető el:

http://localhost:5263
Swagger

A Swagger felület itt érhető el:

http://localhost:5263/swagger
Elérhető végpontok
GET /api/Movies
GET /api/Movies/{id}
POST /api/Movies
PUT /api/Movies/{id}
DELETE /api/Movies/{id}
Fontos megjegyzés

A backend megfelelő működéséhez a MongoDB-nek futnia kell, mielőtt a backend alkalmazást elindítod.