import { Injectable } from '@angular/core';
// import { fakeMovie } from './fake-movie';
import { Movie } from '../models/movie';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptins = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesURL = 'http://127.0.0.1:3000/movies';
  getMovie(): Observable<Movie[]> {
    // this.messageService.add(`${new Date().toLocaleDateString()}. gGet movie list`);
    // return of(fakeMovie);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(recievedMovies => console.log(`reciedMovies = ${JSON.stringify(recievedMovies)}`)), // la khi du lieu tra ve thanh cong
      catchError(error => of([]))
       // khi bi loi thi tra ve mang rong. dung` Of vi` day la Asyn. bat dong` bo, Goi 1 phat chua co ket qua thi lam viec khac.

    );

  }
  getMovieFromID(id: number): Observable<Movie> {
    // return of(fakeMovie.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log(`slected movie = ${JSON.stringify(selectedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }
  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie , httpOptins).pipe(
      tap(updatedMovie => console.log(`update movie: ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }
  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesURL, newMovie, httpOptins).pipe(
      tap((movie: Movie) => console.log(`inserted movie = ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
    );
  }
  deleteMovie(movieId: Movie): Observable<Movie> {
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url, httpOptins).pipe(
      tap(_ => console.log(`Deleted movie with id: ${movieId}`)),
      catchError(error => of(null))
    );
  }

  searchMovies(typedString: string): Observable<Movie[]> {
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundMovies => console.log(`Founded movies = ${JSON.stringify(foundMovies)}`)),
      catchError(error => of(null))
    );
  }
  constructor(
    private http: HttpClient,
    public messageService: MessageService) {

   }
}
