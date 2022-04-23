import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { ShipComponent } from './components/ship/ship.component';
import { CargoPortComponent } from './components/cargo-port/cargo-port.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BattleGridComponent,
    ShipComponent,
    CargoPortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
