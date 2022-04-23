import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPortComponent } from './cargo-port.component';

describe('CargoPortComponent', () => {
  let component: CargoPortComponent;
  let fixture: ComponentFixture<CargoPortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoPortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
