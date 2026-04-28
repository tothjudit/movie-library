# Movie Library

Csapatprojekt az Alkalmazásfejlesztési technológiák tárgyhoz.

## Csapattagok

- Tóth Judit (BFD3ES)
- Takács Bence (RMAK8X)
- Bagdy Dániel (K3NN0I)

## Projekt leírása

A Movie Library egy webalapú filmnyilvántartó alkalmazás, amely lehetővé teszi filmek listázását, részletes megtekintését, új filmek hozzáadását, meglévő filmek szerkesztését és törlését.

A projekt célja egy egyszerű, de jól bővíthető full-stack alkalmazás elkészítése volt, amely saját frontendből, saját backendből és MongoDB adatbázisból áll.

## Projekt célja

A projekt célja az volt, hogy egy egyszerű domain modellen keresztül bemutassa az alkalmazásfejlesztés fontosabb részeit:

- frontend fejlesztés
- backend API fejlesztés
- adatbázis-kapcsolat
- konténerizálás
- CI workflow
- Kubernetes manifest fájlok
- dokumentáció
- tesztelhető és futtatható rendszer összeállítása

## Használt technológiák

- Frontend: Angular + TypeScript
- Backend: ASP.NET Web API + C#
- Adatbázis: MongoDB
- Konténerizálás: Docker, Docker Compose
- CI: GitHub Actions
- Telepítés: Kubernetes manifest fájlok
- API dokumentáció és tesztelés: Swagger / OpenAPI

## Fő funkciók

- filmek listázása
- film részleteinek megtekintése
- új film hozzáadása
- film szerkesztése
- film törlése
- cím szerinti keresés
- lapozás / pagination
- tesztadatok betöltése JSON fájlból script segítségével

## Projektstruktúra

```text
movie-library/
├── backend/                 # ASP.NET Web API backend
├── frontend/                # Angular frontend
├── docs/                    # dokumentációk és tesztadatok
│   └── test-data/           # minta filmadatok
├── scripts/                 # segédscriptek
├── k8s/                     # Kubernetes manifest fájlok
├── .github/workflows/       # GitHub Actions workflow fájlok
├── docker-compose.yml       # Docker Compose konfiguráció
└── README.md                # projekt fő dokumentációja
```

## Dokumentáció

A projekt dokumentációi a `docs/` mappában találhatók.

Ide tartozik többek között:

- projektterv
- felhasználói útmutató
- telepítési útmutató
- architektúra leírás
- draw.io architektúra diagram
- tesztadatok

---

## Gyors indítás Docker Compose használatával

Az alkalmazás teljes egészében futtatható Docker Compose segítségével.

### Előfeltételek

- Docker Desktop telepítve
- Docker engine elindítva
- Git telepítve
- opcionálisan Python a tesztadatok betöltéséhez

### Projekt klónozása

```bash
git clone https://github.com/tothjudit/movie-library.git
cd movie-library
```

### Alkalmazás indítása

A projekt gyökerében futtasd:

```bash
docker compose up --build
```

### Elérhetőségek Docker Compose esetén

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger`

### Alkalmazás leállítása

```bash
docker compose down
```

Ha teljesen tiszta adatbázissal szeretnéd újraindítani a rendszert:

```bash
docker compose down -v
docker compose up --build
```

---

## Tesztadatok betöltése

A projekt teszteléséhez előkészített minta filmadatok találhatók itt:

```text
docs/test-data/12_filmek.json
```

Automatikus betöltéshez egy segédscript is rendelkezésre áll:

```text
scripts/load_movies.py
```

### Python csomag telepítése

Szükség esetén telepítsd a `requests` csomagot:

```bash
pip install requests
```

### Tesztadatok betöltése

A backend futása után a projekt gyökeréből futtasd:

```bash
python scripts/load_movies.py
```

A script a `12_filmek.json` fájlban található filmeket egyesével betölti a rendszerbe a `POST /api/Movies` végponton keresztül.

Sikeres futás után a filmek megtekinthetők:

- frontend felületen: `http://localhost:4200/movies`
- API-n keresztül: `http://localhost:8080/api/Movies`

---

## API végpontok

A backend fő API végpontjai:

| Művelet | Végpont | Leírás |
|---|---|---|
| GET | `/api/Movies` | összes film lekérdezése |
| GET | `/api/Movies/{id}` | egy film részletes lekérdezése |
| POST | `/api/Movies` | új film létrehozása |
| PUT | `/api/Movies/{id}` | meglévő film módosítása |
| DELETE | `/api/Movies/{id}` | film törlése |

A végpontok Swagger felületen is tesztelhetők:

```text
http://localhost:8080/swagger
```

---

## Helyi fejlesztői futtatás

Az alkalmazás Docker nélkül, helyi fejlesztői környezetben is futtatható.

### Frontend függőségek telepítése

```bash
npm run install:frontend
```

### Gyökérszintű segédeszközök telepítése

```bash
npm install
```

### Indítás

```bash
npm run dev
```

### Elérhetőségek helyi fejlesztői futtatás esetén

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:5263`
- Swagger: `http://localhost:5263/swagger`

---

## Jelenlegi működő funkciók

A projekt jelenlegi állapotában az alábbi funkciók működnek:

- filmek listázása
- film részleteinek megtekintése
- új film létrehozása
- film szerkesztése
- film törlése
- cím szerinti keresés
- lapozás / pagination
- MongoDB adatbázis-kapcsolat
- Swagger alapú API tesztelés
- Docker Compose alapú futtatás
- tesztadatok betöltése JSON fájlból script segítségével

## Backend

A backend ASP.NET Web API technológiával készült C# nyelven.

Feladata:

- REST API biztosítása
- filmadatok kezelése
- MongoDB adatbázis használata
- CRUD műveletek megvalósítása
- Swagger / OpenAPI dokumentáció biztosítása

A backend tartalmaz `.http` fájlt is, amelyben példák találhatók a CRUD műveletek kipróbálásához.

## Frontend

A frontend Angular és TypeScript használatával készült.

Feladata:

- filmek megjelenítése kártyás nézetben
- film részleteinek megjelenítése
- új film hozzáadása
- film szerkesztése
- film törlése
- keresés cím alapján
- filmek lapozása több oldalon keresztül

## Docker és konténerizálás

A projekt Docker Compose segítségével indítható.

A `docker-compose.yml` három fő szolgáltatást indít:

- MongoDB adatbázis
- ASP.NET backend
- Angular frontend

Ez biztosítja, hogy a teljes rendszer egységes környezetben fusson.

## Kubernetes

A `k8s/` mappában Kubernetes manifest fájlok találhatók, amelyek a konténerek Kubernetes környezetben történő futtatását támogatják.

## CI workflow

A `.github/workflows/` mappában GitHub Actions workflow fájl található, amely a projekt automatizált build folyamatát támogatja.

## Megjegyzés

A projekt film domain modellt használ, saját backenddel és MongoDB adatbázissal.

A teszteléshez szükséges adatok kézzel Swaggerből vagy automatikusan a mellékelt script segítségével tölthetők be.