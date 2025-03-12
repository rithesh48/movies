import * as readline from 'readline';

export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  ratings: number[];
};

class MoviesManagement {
  private movies: Map<string, Movie> = new Map();
  private idCounter: number = 1;

  private generateMovieId(): string {
    return `MV${this.idCounter++}`;
  }

  addMovie(title: string, director: string, releaseYear: number, genre: string): void {
    const id = this.generateMovieId();
    this.movies.set(id, { id, title, director, releaseYear, genre, ratings: [] });
    console.log(`Movie added successfully with ID: ${id}`);
  }

  rateMovie(id: string, rating: number): void {
    if (!this.movies.has(id)) {
      throw new Error("Movie not found.");
    }
    if (rating < 1 || rating > 5) {
      throw new Error("Rating should be between 1 and 5.");
    }
    this.movies.get(id)!.ratings.push(rating);
    console.log("Rating added successfully.");
  }

  getAverageRating(id: string): number | undefined {
    const movie = this.movies.get(id);
    if (!movie || movie.ratings.length === 0) return undefined;
    const total = movie.ratings.reduce((sum, r) => sum + r, 0);
    return total / movie.ratings.length;
  }

  getTopRatedMovies(): Movie[] {
    return Array.from(this.movies.values())
      .filter(movie => movie.ratings.length > 0)
      .sort((a, b) => (this.getAverageRating(b.id) ?? 0) - (this.getAverageRating(a.id) ?? 0));
  }

  getMoviesByGenre(genre: string): Movie[] {
    return Array.from(this.movies.values()).filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
  }

  getMoviesByDirector(director: string): Movie[] {
    return Array.from(this.movies.values()).filter(movie => movie.director.toLowerCase() === director.toLowerCase());
  }

  searchMoviesBasedOnKeyword(keyword: string): Movie[] {
    return Array.from(this.movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
  }

  getMovie(id: string): Movie | undefined {
    return this.movies.get(id);
  }

  removeMovie(id: string): void {
    if (!this.movies.delete(id)) {
      throw new Error("Movie not found.");
    }
    console.log("Movie removed successfully.");
  }
}

export default MoviesManagement;