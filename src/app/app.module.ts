import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BattleGridComponent } from './components/battle-grid/battle-grid.component';
import { ShipComponent } from './components/ship/ship.component';
import { CargoPortComponent } from './components/cargo-port/cargo-port.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrentPlayerComponent } from './components/current-player/current-player.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayerInputComponent } from './components/player-input/player-input.component';
import { BattlePlatformComponent } from './components/battle-platform/battle-platform.component';

// mat modules
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfigurationsComponent } from './components/configurations/configurations.component';

// TODO: move mat modules to specific subm modules

const matModules = [
  MatMenuModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BattleGridComponent,
    ShipComponent,
    CargoPortComponent,
    CurrentPlayerComponent,
    PlayerDetailsComponent,
    PlayerInputComponent,
    BattlePlatformComponent,
    ConfigurationsComponent
  ],
  imports: [
    ...matModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
