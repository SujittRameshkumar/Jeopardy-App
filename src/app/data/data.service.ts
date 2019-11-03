import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Data } from './data.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
}


@Injectable()
export class dataService {
     cluesUrl = "http://jservice.io/api/category?id="
     finish = ".json";
     randomClueUrl = "http://jservice.io/api/random.json";
     categoriesUrl= "http://jservice.io/api/categories/";

     

constructor (private http: HttpClient) {}

getData (number): Observable<Data[]> {
    return this.http.get<Data[]>(this.cluesUrl+number+this.finish)
}

getCategories(incomingCount: number, incomingOffset: number) {
    const params: any = {};
    params.count = incomingCount;
    params.offset = incomingOffset;
    console.log(this.http.get<any[]>(this.categoriesUrl, {params: params}));
    return this.http.get<Category[]>(this.categoriesUrl, {params: params});
}
getRandom (): Observable<Data[]> {
    return this.http.get<Data[]>(this.randomClueUrl)
}
getCat (): Observable<Data[]> {
    return this.http.get<Data[]>(this.categoriesUrl)
}

searchData(term: string): Observable<Data[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('category', term) } : {};

    return this.http.get<Data[]>(this.cluesUrl, options)



}


}