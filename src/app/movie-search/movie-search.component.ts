import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  // la 1 object, list ma n ochay theo Asyn, theo tien trinh rieng. khi dang chayj van co the go~.
  movies$: Observable<Movie[]>;
  private searchSubject = new Subject<string>();


  constructor(private movieService: MovieService) { }
  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);
    // Ham next, khi go 1 ky tu vao-> thi ky tu moi se dc nhet' vao trong steam de xu ly'. Xu ly labat dong bo.
    this.searchSubject.next(searchedString);
  }

  ngOnInit() {
    this.movies$ = this.searchSubject.pipe(
      debounceTime(300), // doi 300mns thoi gian giua cac lan bam.
      distinctUntilChanged(), // Neu cac ky tu go vao giong nhau thi ko gui request nua.
      switchMap((searchedString: string) => this.movieService.searchMovies(searchedString))
    );
  }

}
