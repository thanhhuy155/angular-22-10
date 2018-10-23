import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { fakeMovie } from '../fake-movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // moive: Movie = {
  //   id: 1,
  //   name: 'Star war',
  //   releaseYear: 1994
  // };
  movies: Movie[];
  selectMovie: Movie;
  constructor( private movieService: MovieService) {

  }
  getMoviesFromServices(): void {
    // this.movies = this.movieService.getMovie();
    this.movieService.getMovie().subscribe(
      (updatedMovies) => {
        this.movies = updatedMovies;
        console.log(`this.movie = ${JSON.stringify(this.movies)}`);
      }
    );
  }
  ngOnInit() {
    this.getMoviesFromServices();
  }

  // Add movie
  add(name: string, releaseYear: string): void {
    name = name.trim(); // cắt gọt các dấu space ở đầu và cuối.
    if (Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0) {
      alert('Name must not be blank, Relase year must be a number');
    }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.movieService.addMovie(newMovie)
      .subscribe(insertedMovie => {
        this.movies.push(insertedMovie);
      });
  }

  delete(movieId: any): void {
    this.movieService.deleteMovie(movieId).subscribe(
      _ => {
        this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId);
      }
    );
  }



  // onSelect(movie: Movie): void {
  //   this.selectMovie = movie;
  //   console.log(this.selectMovie);
  //   // alert(`selectedMovie = ${JSON.stringify(this.selectMovie)}`);
  // }
}
