import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';

//Service that we use to communicate with the nasa api  
import {NasaApiService} from '../nasa-api.service'
import {asset} from '../asset'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {
  // Array where we store the results of the api call that we make
  results : asset[] ; 

  //Search term in the bar
  searchTerm : string ; 

  constructor(private nasaService : NasaApiService) { }

  ngOnInit(): void {
    this.results = [] 
    this.nasaService.searchResults.subscribe(lastResults => {
      if(lastResults){
        this.results = lastResults
      }
    }) ; 
  }

  //Keep the state of this componant stored in the service, this makes it possible to get the same results when going back to the page
  ngOnDestroy(){
    this.nasaService.lastSearch(this.results)
  }



  // Start the search. 
  sendSearch(){
    //Need to reintialize the array containing the results each time, otherwise the component will display the previous results along with the new ones. 
    this.results = []

    //Subscribing to the service that gets us the api response. 
    this.nasaService.searchResult(this.searchTerm).subscribe(apiResponse => {
      //Extracting the fields that we want from the api response
      for (const d of ( apiResponse['collection']['items'] as any)){
        this.results.push({
          "title" : d.data[0].title, 
          "href" : d.links[0].href,
          "nasa_id" : d.data[0].nasa_id ,
          "short_description" : d.data[0].description_508, 
          "long_description": d.data[0].description, 
          "media_type" : d.data[0].media_type
        })
        
      }; 
    }) ; 

    localStorage.setItem("searchTerm" , this.searchTerm) ; 
  }

  //Send a single asset's data to the asset component to be displayed
  clickOnAsset(result : asset) {
    this.nasaService.setMessage(result)
  }

}
