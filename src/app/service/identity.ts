import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, of, Observable } from 'rxjs';

export interface UserIdentity {
  nic: string;
  accountName: string;
  accountStatus: string;
}

@Injectable({ providedIn: 'root' })
export class IdentityService {
  // private http = inject(HttpClient); // In a real app, use this

  // Mock API implementation
  getIdentity(): Observable<UserIdentity> {
    return of({
      nic: '199012345678',
      accountName: 'Asiri Alwis',
      accountStatus: 'ACTIVE'
    }).pipe(delay(1000));
  }
}