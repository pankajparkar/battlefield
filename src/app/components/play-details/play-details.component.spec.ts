import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDetailsComponent } from './play-details.component';

describe('PlayDetailsComponent', () => {
  let component: PlayDetailsComponent;
  let fixture: ComponentFixture<PlayDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
