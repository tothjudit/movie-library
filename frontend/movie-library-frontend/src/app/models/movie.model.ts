export interface Movie {
  id?: string;
  title: string;
  description: string | null;
  year: number;
  director?: string;
  genre?: string;
  rating?: number | null;
  posterUrl?: string | null;
}
