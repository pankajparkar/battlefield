import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { ShipComponent } from './components/ship/ship.component';
import { CargoPortComponent } from './components/cargo-port/cargo-port.component';
import { PlayDetailsComponent } from './components/play-details/play-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

// TODO: move mat modules to specific subm modules

const matModules = [
  MatMenuModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BattleGridComponent,
    ShipComponent,
    CargoPortComponent,
    PlayDetailsComponent
  ],
  imports: [
    ...matModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
