import json
from pathlib import Path

import requests

API_URL = "http://localhost:8080/api/Movies"
JSON_FILE = Path(__file__).resolve().parent.parent / "docs" / "test-data" / "12_filmek.json"


def main() -> None:
    if not JSON_FILE.exists():
        print(f"Nem található a JSON fájl: {JSON_FILE}")
        return

    with open(JSON_FILE, "r", encoding="utf-8") as f:
        movies = json.load(f)

    print(f"{len(movies)} film betöltése innen: {JSON_FILE}")

    success_count = 0
    error_count = 0

    for movie in movies:
        try:
            response = requests.post(API_URL, json=movie, timeout=10)
            title = movie.get("title", "Ismeretlen cím")

            if response.status_code in (200, 201):
                print(f"[OK] {title}: {response.status_code}")
                success_count += 1
            else:
                print(f"[HIBA] {title}: {response.status_code}")
                print(response.text)
                error_count += 1

        except requests.RequestException as e:
            print(f"[KIVÉTEL] {movie.get('title', 'Ismeretlen cím')}: {e}")
            error_count += 1

    print()
    print(f"Sikeres: {success_count}")
    print(f"Hibás: {error_count}")


if __name__ == "__main__":
    main()