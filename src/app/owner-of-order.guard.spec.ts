import { TestBed } from '@angular/core/testing';

import { OwnerOfOrderGuard } from './owner-of-order.guard';

describe('OwnerOfOrderGuard', () => {
  let guard: OwnerOfOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OwnerOfOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
