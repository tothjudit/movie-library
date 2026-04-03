# Movie Library – Projektterv

## 1. Projektáttekintés

**Projekt neve:** Movie Library

**Rövid leírás:**  
A Movie Library egy webalapú filmnyilvántartó alkalmazás, amely lehetővé teszi a felhasználók számára filmek listázását, részletes megtekintését, új filmek hozzáadását, meglévő filmek szerkesztését és törlését. A rendszer frontendből, backendből és adatbázisból áll, és úgy kerül megtervezésre, hogy később Docker konténerekben futtatható, CI workflow-val buildelhető, valamint Kubernetes környezetben telepíthető legyen.

**Projekt célja:**  
A projekt célja egy egyszerű, de jól bővíthető filmkezelő rendszer megvalósítása, amely alkalmas a modern alkalmazásfejlesztési technológiák gyakorlati bemutatására. A csapat célja elsődlegesen egy stabil, jól dokumentált beadás elkészítése, amelyben a frontend és backend össze van kötve.

**Miért ezt a projektet választottuk?**  
A filmes témájú adatmodell egyszerűen kezelhető, könnyen tervezhető rá CRUD API és frontend felület, és jól illeszkedik az egyszerű domain modell követelményéhez.

## 2. Funkcionális követelmények

### 2.1 Kötelező minimum funkciók

1. **Filmek listázása**  
   A rendszer megjeleníti az adatbázisban tárolt filmek listáját.

2. **Film részleteinek megjelenítése**  
   A felhasználó egy kiválasztott film részletes adatait külön oldalon vagy nézetben láthatja.

3. **Új film hozzáadása**  
   A felhasználó űrlapon keresztül új filmet vihet fel a rendszerbe.

4. **Film szerkesztése**  
   A meglévő film adatai módosíthatók.

5. **Film törlése**  
   Egy kiválasztott film eltávolítható az adatbázisból.

### 2.2 Opcionális extra funkciók

1. Keresés cím alapján  
2. Szűrés műfaj szerint  
3. Rendezés cím vagy év szerint  
4. Filmposzter URL megjelenítése  
5. Jobb hiba- és betöltési állapotok kezelése

**Döntés:**  
A csapat első körben csak a kötelező minimum funkciókat valósítja meg. Az extra funkciók csak akkor készülnek el, ha a fő funkciók, a Docker, a CI, a Kubernetes és a dokumentáció már stabilan elkészült.

## 3. Domain modell

A rendszer elsődleges entitása a **Movie**.

### 3.1 Entity: Movie

| Mező neve | Típus | Kötelező | Leírás |
| id | string | igen | Egyedi azonosító |
| title | string | igen | A film címe |
| director | string | igen | A rendező neve |
| genre | string | igen | A film műfaja |
| releaseYear | number | igen | A megjelenés éve |
| rating | number | nem | Opcionális értékelés |
| description | string | nem | Rövid leírás |

### 3.2 Megjegyzések

Ez a domain modell egyszerű, jól érthető, és jól leképezhető MongoDB dokumentumra, backend modellre és frontend űrlapokra.

### 3.3 Lehetséges későbbi bővítések

Ha marad idő, a modell később bővíthető például:
- posterUrl
- createdAt
- updatedAt
- review adatokkal vagy külön Review entitással

Ezek nem részei az első verzió kötelező scope-jának.

## 4. Architektúra terv

### 4.1 Logikai architektúra

A rendszer fő komponensei:

- Felhasználó / böngésző
- Angular frontend
- ASP.NET Web API backend
- MongoDB adatbázis

### 4.2 Fő működési folyamat

1. A felhasználó a böngészőben használja a frontendet.
2. A frontend HTTP kéréseket küld a backend API-nak.
3. A backend feldolgozza a kéréseket és kommunikál a MongoDB-vel.
4. A backend JSON válaszokat küld vissza a frontendnek.
5. A frontend megjeleníti az adatokat a felhasználó számára.

### 4.3 Későbbi technikai elemek

A végső beadás részeként a rendszer később kiegészül:
- Docker konténerekkel
- GitHub Actions CI workflow-val
- container registry használatával
- Kubernetes deployment és service manifestekkel
- telepítési útmutatóval
- user guide-dal

## 5. Csapatszerepek

A csapat 3 főből áll, ezért a feladatokat három fő felelősségi körre bontjuk.

### 5.1 Frontend felelős

Feladatai:
- Angular projekt létrehozása
- oldalak és komponensek elkészítése
- routing kialakítása
- film lista oldal elkészítése
- film részletek oldal elkészítése
- új film felvitele űrlap elkészítése
- film szerkesztő űrlap elkészítése
- backend API hívások integrálása
- alap UI kialakítása

### 5.2 Backend felelős

Feladatai:
- ASP.NET Web API projekt létrehozása
- Movie modell kialakítása
- MongoDB kapcsolat létrehozása
- CRUD végpontok megvalósítása
- service/repository réteg kialakítása
- hibakezelés
- `.http` tesztfájl elkészítése a végpontok kipróbálásához

### 5.3 DevOps és dokumentáció felelős

Feladatai:
- GitHub repository struktúra kezelése
- README karbantartása
- Dockerfile-ok előkészítése
- GitHub Actions CI workflow elkészítése
- Kubernetes YAML fájlok elkészítése
- telepítési útmutató megírása
- user guide megírása
- draw.io architektúraábra kezelése

## 6. A tervezési fázis kimenetei

A tervezési fázis végére az alábbi elemeknek kell elkészülniük:

### 6.1 Végleges projektcél

A Movie Library projekt célja egy egyszerű filmnyilvántartó webalkalmazás elkészítése Angular frontenddel, ASP.NET backenddel és MongoDB adatbázissal. A rendszer lehetővé teszi filmek listázását, megtekintését, hozzáadását, szerkesztését és törlését. A projekt célja továbbá a modern alkalmazásfejlesztési technológiák gyakorlati bemutatása, beleértve a konténerizálást, a CI workflow-t, a Kubernetes-alapú telepítést és a kapcsolódó dokumentáció elkészítését.

### 6.2 Entity lista

- Movie

### 6.3 API terv

| Metódus | URL | Funkció |
| GET | `/api/movies` | Filmek listázása |
| GET | `/api/movies/{id}` | Egy film lekérése azonosító alapján |
| POST | `/api/movies` | Új film hozzáadása |
| PUT | `/api/movies/{id}` | Film adatainak módosítása |
| DELETE | `/api/movies/{id}` | Film törlése |

### 6.4 Képernyőlista

1. Film lista oldal  
2. Film részletek oldal  
3. Új film hozzáadása oldal  
4. Film szerkesztése oldal  
5. Opcionálisan hiba / not found oldal

### 6.5 Tervezett dokumentációs fájlok

- `docs/project-plan.md`
- `docs/architecture.drawio`
- `README.md`

## 7. Technológiai döntések

A csapat a következő technológiákat választja:

- **Frontend:** Angular + TypeScript
- **Backend:** ASP.NET + C#
- **Adatbázis:** MongoDB

## 8. Scope-határok

A projekt első verziója **nem** tartalmazza:
- felhasználói bejelentkezést
- szerepkörkezelést
- microservice architektúrát
- MCP szervert
- ArgoCD-t
- összetett kereső- és szűrőrendszert
- külön review rendszert

Ennek oka, hogy a csapatnak 4 hete van, ezért a fő cél egy stabil, működő, jól dokumentált beadás elkészítése.

## 9. Összegzés

A Movie Library egy egyszerű, jól körülhatárolt csapatprojekt, amely alkalmas a frontend-backend alapú webalkalmazás-fejlesztés, adatbázis-kezelés, konténerizálás és Kubernetes-alapú telepítés bemutatására. A választott scope tudatosan visszafogott, hogy a csapat 4 hét alatt stabil, beadásra alkalmas rendszert tudjon készíteni.
