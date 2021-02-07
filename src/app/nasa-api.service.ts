import { Injectable } from '@angular/core';
import {Observable  , BehaviorSubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'

import {asset} from './asset'



@Injectable({
  providedIn: 'root'
})

export class NasaApiService {
  //Used to get the nasa_id for each asset. 
  private asset   = new BehaviorSubject<asset>(null) ; 
  currentAsset = this.asset.asObservable(); 

  //Stores the result of searchs to keep state
  private search = new BehaviorSubject<asset[]>(null); 
  searchResults = this.search.asObservable(); 

  constructor(private http : HttpClient ) { } ;

  //Gets api for search operation , takes search term as input
  searchResult(searchTerm : string) : Observable<object> {
    let apiUrl = 'https://images-api.nasa.gov/search?q='+searchTerm;
    console.log('Sending request to the Api', apiUrl); 
    return this.http.get<object>(apiUrl);
    
  } 

  assetResult(nasa_id : string) : Observable<object> {
    let apiUrl = 'https://images-api.nasa.gov/asset/'+nasa_id
    return this.http.get(apiUrl)
  } 


  setMessage(message : asset) : void  {
    this.asset.next(message); 
  }

  lastSearch(results : asset[]) : void {
    this.search.next(results)
  }



}
