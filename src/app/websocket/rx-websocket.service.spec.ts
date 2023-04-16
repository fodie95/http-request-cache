import { TestBed } from '@angular/core/testing';

import { RxWebsocketService } from './rx-websocket.service';

describe('RxWebsocketService', () => {
  let service: RxWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
