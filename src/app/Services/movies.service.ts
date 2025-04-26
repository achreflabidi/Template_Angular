import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Api_Movies='http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/kata';


export interface Person{
  id:number;
  firstname :string;
  lastname:string;
}
export interface Movies{
  id:number;
  title:string;
  actors : number[];
  directors: number[];
  generes:string[];
  year:number;s
  actorsNames?: string[];      
  directorsNames?: string[];
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http : HttpClient) { }

  getMovies(page: number, size: number): Observable<Page<Movies>> {
    return this.http.get<Page<Movies>>(`http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/kata/movies?page=${page}&size=${size}`);
  }
  
  getMovieById(id:number):Observable<any>{
    return this.http.get('http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/kata/movies/${id}');
  }
  GetPersonns(page : number , size:number):Observable<Page<Person>>{
   
    return this.http.get<Page<Person>>(`http://ec2-15-237-160-101.eu-west-3.compute.amazonaws.com:8828/kata/persons?page=${page}&size=${size}`);
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`${Api_Movies}/persons/${id}`);
  }
}
