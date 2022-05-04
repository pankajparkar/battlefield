import { Injectable } from '@angular/core';
import { Sound } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(
  ) { }

  play(sound: Sound) {
    const el: any = document.getElementById('audio');
    let src;
    switch (sound.toString()) {
      case Sound.GameStarted.toString():
        src = '/assets/game_started.ogg';
        break;
      case Sound.Wounded.toString():
        src = '/assets/wounded.ogg';
        break;
      case Sound.Killed.toString():
        src = '/assets/killed.ogg';
        break;
      case Sound.Missed.toString():
        src = '/assets/missed.ogg';
        break;
      case Sound.Win.toString():
        src = '/assets/win.ogg';
        break;
      default:
        src = '';
        break;
    }
    el.src = src;
    if (src) {
      el.play();
    }
  }
}
