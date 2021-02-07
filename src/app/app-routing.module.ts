import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  {path : 'search' , component : CardsComponent} , 
  {path : 'asset/:id' , component : AssetsComponent },
  {path: '', redirectTo: 'search', pathMatch :'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
