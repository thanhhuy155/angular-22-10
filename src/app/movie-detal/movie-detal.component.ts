import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// De dung cho goback
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detal',
  templateUrl: './movie-detal.component.html',
  styleUrls: ['./movie-detal.component.css']
})
export class MovieDetalComponent implements OnInit {
  @Input() movie: Movie;
  // injectable nghia la ta co the trich xuat no bat ki noi dau.
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private lotacion: Location
  ) {

  }

  ngOnInit() {
    this.getMovieFromRoute();
  }
  getMovieFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    // Call service to get movie from id?
    this.movieService.getMovieFromID(id).subscribe(movie => this.movie = movie);
  }
  goBack(): void {
    this.lotacion.back();
  }
  saveMovie(): void {
    this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
  }
}
