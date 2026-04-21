# Movie Library – Telepítési útmutató

## Projekt leírása
A Movie Library egy webalapú filmnyilvántartó alkalmazás, amely lehetővé teszi a filmek listázását, megtekintését, hozzáadását, szerkesztését és törlését.

## Használt technológiák
- Frontend: Angular
- Backend: ASP.NET Web API
- Adatbázis: MongoDB
- Konténerizáció: Docker
- CI/CD: GitHub Actions
- Konténer registry: GitHub Container Registry (GHCR)
- Orkesztráció: Kubernetes

## Előfeltételek
A projekt futtatásához az alábbi szoftverek szükségesek:
- Git
- Docker Desktop
- Node.js
- .NET SDK
- kubectl

## Projekt klónozása
```bash
git clone https://github.com/tothjudit/movie-library.git
cd movie-library
git checkout feature/devops