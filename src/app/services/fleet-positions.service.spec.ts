import { TestBed } from '@angular/core/testing';

import { FleetPositionsService } from './fleet-positions.service';

describe('FleetPositionsService', () => {
  let service: FleetPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
