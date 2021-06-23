import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'https://cloud---api.herokuapp.com/apis'; // this returns all APIs with category search term
  idUrl: string = 'https://cloud---api.herokuapp.com/apis/:id';
  categoryUrl: string = 'https://cloud---api.herokuapp.com/apis/:category';
  updateUrl: string = 'https://cloud---api.herokuapp.com/apis/:id';
  postUrl: string = 'https://cloud---api.herokuapp.com/apis';
  deleteUrl: string = 'https//cloud---api.herokuapp.com/apis/:id';
  nameURL: string = 'https://cloud---api.herokuapp.com/apis/:name';

  
  constructor(private http: HttpClient) {}



   searchAPIS(search:string):Observable<any> {

    return this.http.get(this.apiUrl)
   }
  


  getID(id: number): Observable<any> {
    return this.http.get(`${this.idUrl}/${id}`);
  };



  getName(name: string): Observable<any> {
    return this.http.get(`${this.nameURL}/${name}`);
  };


  postNewAPI(): Observable<any> {
    return this.http.get(this.postUrl);
  };


  update(id: number): Observable<any> {
    return this.http.get(`${this.updateUrl}/${id}`);
  };


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }


  };