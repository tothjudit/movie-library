# Movie Library

Csapatprojekt az Alkalmazásfejlesztési technológiák tárgyhoz.

## Csapattagok

- Tóth Judit (BFD3ES)
- Takács Bence (RMAK8X)
- Bagdy Dániel (K3NN0I)

## Projekt leírása

A Movie Library egy webalapú filmnyilvántartó alkalmazás, amely lehetővé teszi a felhasználók számára filmek listázását, részletes megtekintését, új filmek hozzáadását, meglévő filmek szerkesztését és törlését.

## Projekt célja

A projekt célja egy egyszerű, de jól bővíthető filmkezelő rendszer megvalósítása modern alkalmazásfejlesztési technológiák használatával.

## Használt technológiák

- Frontend: Angular + TypeScript
- Backend: ASP.NET Web API + C#
- Adatbázis: MongoDB
- Konténerizálás: Docker
- CI: GitHub Actions
- Telepítés: Kubernetes

## Tervezett fő funkciók

- filmek listázása
- film részleteinek megjelenítése
- új film hozzáadása
- film szerkesztése
- film törlése

## Projektstruktúra

- `frontend/` – frontend alkalmazás
- `backend/` – backend alkalmazás
- `docs/` – projektterv és dokumentáció
- `k8s/` – Kubernetes fájlok

## Dokumentáció

A projektterv és az architektúra leírás a `docs` mappában található.

## Gyors indítás a projekt gyökeréből

Az alkalmazás indítható közvetlenül a gyökérmappából is.

1. Telepítsd a frontend függőségeit:

```bash
npm run install:frontend
```

2. Telepítsd a gyökér szintű segédeszközt:

```bash
npm install
```

3. Indítsd el az összes szükséges szolgáltatást (MongoDB + backend + frontend):

```bash
npm run dev
```

Frontend: `http://localhost:4200`  
Backend API: `http://localhost:5263`

Megjegyzés: a `dev` script automatikusan lefuttat egy `npm install` lépést a gyökérben, így a szükséges `concurrently` csomag hiánya nem okoz indulási hibát.
Ha a backend már fut a `5263` porton, a gyökér script új példány indítása helyett automatikusan a futó példányt használja.
