import { TestBed } from '@angular/core/testing';

import { BridgeInterceptor } from './bridge.interceptor';

describe('BridgeInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BridgeInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BridgeInterceptor = TestBed.inject(BridgeInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
