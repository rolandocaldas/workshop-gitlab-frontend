import { Injectable } from '@angular/core';


import {Hero} from "../../entity/hero";

import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl:string = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getHero(id:number) : Observable<Hero> {

    const url = `${this.apiUrl}character/${id}`;

    return this.http.get<Hero>(url)
      .pipe(
        catchError(this.handleError<Hero>('`getHero id=${id}`'))
      );

  }
}
