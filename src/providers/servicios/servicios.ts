import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:5000/';

@Injectable()
export class ServiciosProvider {
  token: any;
  userData: any;

  constructor(public http : Http) {
  }
 

  post(hash,tarea,type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl + type + '/' + hash + '/' + tarea, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  
  get(type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(apiUrl + type,{headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  delete(hash,type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.delete(apiUrl + type+ '/' + hash,{headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  
}