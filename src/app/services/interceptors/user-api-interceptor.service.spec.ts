import { TestBed } from '@angular/core/testing';

import { UserApiInterceptorService } from './user-api-interceptor.service';

describe('UserApiInterceptorService', () => {
  let service: UserApiInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
