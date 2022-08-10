import { TestBed } from '@angular/core/testing';

import { BridgeGuard } from './bridge.guard';

describe('BridgeGuard', () => {
  let guard: BridgeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BridgeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
