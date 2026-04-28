# Movie Library Backend

## Áttekintés

Ez a Movie Library projekt backend API-ja.

A backend ASP.NET Web API technológiával készült C# nyelven, és MongoDB adatbázist használ a filmadatok tárolására.

Az API REST alapú végpontokat biztosít a filmek kezeléséhez, és támogatja a teljes CRUD működést:

- összes film lekérdezése
- egy film lekérdezése azonosító alapján
- új film létrehozása
- meglévő film módosítása
- film törlése

## Használt technológiák

- ASP.NET Web API
- C#
- MongoDB
- Docker
- Docker Compose
- Swagger / OpenAPI
- `.http` mintakérések

## Projektstruktúra

```text
backend/
└── MovieLibrary.Api/
    ├── Controllers/
    │   └── MoviesController.cs
    ├── Models/
    │   ├── Movie.cs
    │   └── MongoDbSettings.cs
    ├── Services/
    │   └── MovieService.cs
    ├── Program.cs
    ├── MovieLibrary.Api.http
    └── Dockerfile
```

## Fontos fájlok

- `Controllers/MoviesController.cs` – API végpontok
- `Models/Movie.cs` – film domain modell
- `Models/MongoDbSettings.cs` – MongoDB beállítási modell
- `Services/MovieService.cs` – MongoDB adatkezelő service
- `Program.cs` – service regisztráció, CORS, Swagger és alkalmazásindítás
- `MovieLibrary.Api.http` – mintakérések a CRUD műveletek teszteléséhez
- `Dockerfile` – backend konténer build fájl

## API végpontok

| Művelet | Végpont | Leírás |
|---|---|---|
| GET | `/api/Movies` | összes film lekérdezése |
| GET | `/api/Movies/{id}` | egy film részletes lekérdezése |
| POST | `/api/Movies` | új film létrehozása |
| PUT | `/api/Movies/{id}` | meglévő film módosítása |
| DELETE | `/api/Movies/{id}` | film törlése |

## Swagger

A backend Swagger / OpenAPI felületen keresztül is tesztelhető.

Docker Compose használata esetén:

```text
http://localhost:8080/swagger
```

Helyi fejlesztői futtatás esetén:

```text
http://localhost:5263/swagger
```

## Docker Compose alapú futtatás

A backend a teljes rendszer részeként Docker Compose segítségével indítható a projekt gyökeréből.

A projekt gyökerében futtasd:

```bash
docker compose up --build
```

Ez elindítja:

- MongoDB adatbázist
- ASP.NET backend API-t
- Angular frontendet

Docker Compose esetén a backend API elérhető:

```text
http://localhost:8080
```

A Swagger felület:

```text
http://localhost:8080/swagger
```

## Leállítás

A teljes rendszer leállítása a projekt gyökeréből:

```bash
docker compose down
```

Ha az adatbázis volume-ot is törölni szeretnéd, például tiszta teszteléshez:

```bash
docker compose down -v
```

## Helyi fejlesztői futtatás

A backend külön is futtatható helyi fejlesztői környezetben.

### Követelmények

- .NET SDK
- MongoDB elérhetőség
- opcionálisan Docker Desktop

### Futtatás

A backend projekt mappájában:

```bash
cd backend/MovieLibrary.Api
dotnet run
```

Helyi futtatás esetén az API alapértelmezett címe:

```text
http://localhost:5263
```

Swagger:

```text
http://localhost:5263/swagger
```

## MongoDB kapcsolat

A MongoDB kapcsolat beállításai az alkalmazás konfigurációjában szerepelnek.

Docker Compose futtatás esetén a backend a compose hálózaton keresztül kapcsolódik a MongoDB konténerhez.

A fő beállítások:

- ConnectionString
- DatabaseName
- MoviesCollectionName

## Film modell

A `Movie` modell fő mezői:

- `Id`
- `Title`
- `Director`
- `Genre`
- `ReleaseYear`
- `Rating`
- `Description`
- `PosterUrl`

Az azonosító rövid, számos string formában kerül mentésre, például:

```json
{
  "id": "1"
}
```

## `.http` mintakérések

A projekt tartalmaz egy `.http` fájlt is:

```text
MovieLibrary.Api/MovieLibrary.Api.http
```

Ebben példák találhatók a CRUD műveletek kipróbálására:

- összes film lekérdezése
- film lekérdezése azonosító alapján
- új film létrehozása
- film módosítása
- film törlése

## Tesztadatok

A közös tesztadatok nem a backend mappában, hanem a projekt gyökeréhez tartozó dokumentációs mappában találhatók:

```text
docs/test-data/12_filmek.json
```

A betöltő script:

```text
scripts/load_movies.py
```

A script futtatása a projekt gyökeréből:

```bash
python scripts/load_movies.py
```

## Megjegyzés

A backend saját MongoDB adatbázist használ, és REST API-n keresztül szolgálja ki a frontend alkalmazást.

A CRUD műveletek Swaggerrel, `.http` fájllal, illetve a frontend felületen keresztül is tesztelhetők.