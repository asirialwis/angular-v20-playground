import { Injectable } from '@angular/core';
import { delay, of, Observable } from 'rxjs';

export interface UserIdentity {
  nic: string;
  accountName: string;
  accountStatus: string;
}

@Injectable({ providedIn: 'root' })
export class IdentityService {
  getIdentity(): Observable<UserIdentity> {
    return of({
      nic: '199012345678',
      accountName: 'Asiri Alwis',
      accountStatus: 'ACTIVE'
    }).pipe(delay(1000));
  }
}