import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//Service that we use to communicate with the nasa api  
import {NasaApiService} from '../nasa-api.service'

import {asset} from '../asset'

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  asset : asset ;
  constructor(private nasaService : NasaApiService , private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //Getting the asset object from the previous search result, it contains the description and the media type that we can use
    // to show the correct format, 
    this.nasaService.currentAsset.subscribe(currentAsset => {
      this.asset = currentAsset ; 
      // This is the call to get the image in its original size, but we need to select it from a list, the correct link ends with
      // -orig.jpg or -orig.mp4 
      this.nasaService.assetResult(this.asset.nasa_id).subscribe(imagesResponse => {
        let imagesList = imagesResponse['collection']['items']
        for (const key in imagesList) {
          let imageLink   = imagesList[key].href; ;
          //Getting the last 8 elements of the link, we just need to check whether is contains the orig string or not since we already know the media type. 
          if (imageLink.substring(imageLink.length -8 , imageLink.length-4) == 'orig'){
            this.asset['href_orig'] = this._sanitizer.bypassSecurityTrustResourceUrl('https://'+imageLink.split('://').pop())
          }
        }
      }) ; 
    })
  }

}
