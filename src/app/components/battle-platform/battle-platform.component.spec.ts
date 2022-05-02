import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlePlatformComponent } from './battle-platform.component';

describe('BattlePlatformComponent', () => {
  let component: BattlePlatformComponent;
  let fixture: ComponentFixture<BattlePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlePlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
