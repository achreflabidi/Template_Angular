import { Component, OnInit } from '@angular/core';
import { Movies, MoviesService, Person } from 'src/app/Services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Movies[] = [];
  
  page: number = 0;
  size: number = 3;
  totalPages: number = 0;
  constructor( private MS : MoviesService) { }

  ngOnInit(): void {
    this.loadMovies(); 
   
  }
  loadMovies(): void {
    this.MS.getMovies(this.page, this.size).subscribe(response => {
      response.content.forEach(movie => {
        movie.actorsNames = [];
        movie.directorsNames = [];

        this.loadPeople(movie.actors, movie, true);     // Acteurs
        this.loadPeople(movie.directors, movie, false); // Réalisateurs

        this.movies.push(movie);
      });

      this.page = response.number + 1;
      this.totalPages = response.totalPages;
    });
  }

  loadPeople(ids: number[], movie: Movies, isActor: boolean): void {
    ids.forEach(id => {
      this.MS.getPersonById(id).subscribe((person: Person) => {
        const fullName = `${person.firstname} ${person.lastname}`;
        if (isActor) {
          movie.actorsNames?.push(fullName);
        } else {
          movie.directorsNames?.push(fullName);
        }
      });
    });
  }

  isLastPage(): boolean {
    return this.page >= this.totalPages;
  }
}