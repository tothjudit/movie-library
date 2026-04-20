# Movie Library – Felhasználói útmutató

## Az alkalmazás célja
A Movie Library alkalmazás célja, hogy a felhasználók egy egyszerű webes felületen kezelni tudják a filmek adatait.

## Fő funkciók
- filmek listázása
- film részleteinek megtekintése
- új film hozzáadása
- meglévő film szerkesztése
- film törlése

## Az alkalmazás elérése
Docker Compose esetén:
- http://localhost:4200

Kubernetes esetén:
- http://localhost:30080

## Használat
### Filmek listázása
A kezdőlapon megjelenik a filmek listája. Ha az adatbázis üres, a rendszer a „No movies found.” üzenetet jelenítheti meg.

### Új film hozzáadása
A felhasználó űrlapon keresztül új filmet vihet fel a rendszerbe.

### Film részleteinek megtekintése
A kiválasztott film részletes adatai külön nézetben vagy oldalon jelennek meg.

### Film szerkesztése
A meglévő filmek adatai módosíthatók.

### Film törlése
A rendszer lehetőséget biztosít a kiválasztott film eltávolítására.

## Backend API végpontok
A backend az alábbi REST API műveleteket biztosítja:
- GET /api/Movies
- GET /api/Movies/{id}
- POST /api/Movies
- PUT /api/Movies/{id}
- DELETE /api/Movies/{id}

## Megjegyzés
Első indításkor az adatbázis üres lehet, ezért kezdetben nem feltétlen jelennek meg filmek a listában.