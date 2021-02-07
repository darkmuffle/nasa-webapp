import { Component, OnInit } from '@angular/core';
import {NasaApiService} from '../nasa-api.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private nasaService : NasaApiService) { }

  ngOnInit(): void {
  }


  
 
}

