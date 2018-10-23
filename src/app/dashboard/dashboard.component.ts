import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  constructor( private movieService: MovieService) { }

  ngOnInit( ) {
    this.getMovie();
  }
  getMovie(): void {
    // subcribe laf theo doi, quan sat, khi nao co ham Getmovie thif se nhay vao trong arrow func
    this.movieService.getMovie().subscribe(
    movies => this.movies = movies.slice(0, 3));
  }

}
