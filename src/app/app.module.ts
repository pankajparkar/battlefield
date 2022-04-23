import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { ShipComponent } from './components/ship/ship.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BattleGridComponent,
    ShipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
