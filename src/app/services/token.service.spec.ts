import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token.service';

describe('TokenService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
