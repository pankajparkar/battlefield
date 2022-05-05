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
import { BattlePlatformComponent } from './components/battle-platform/battle-platform.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';

// mat modules
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// TODO: move mat modules to specific subm modules

const matModules = [
  MatMenuModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule,
  DragDropModule,
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
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 5000 },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
