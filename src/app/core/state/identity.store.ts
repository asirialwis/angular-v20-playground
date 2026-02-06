import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { IdentityService } from '../services/identity.service';

export const IdentityStore = signalStore(
  { providedIn: 'root' },
  withState({
    nic: '',
    accountName: '',
    accountStatus: '',
    isLoading: false,
    error: null as string | null
  }),
  withMethods((store, service = inject(IdentityService)) => ({
    loadIdentity: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => service.getIdentity().pipe(
          tap((data) => patchState(store, { ...data, isLoading: false })),
          catchError(() => {
            patchState(store, { isLoading: false, error: 'Failed to load identity' });
            return EMPTY;
          })
        ))
      )
    )
  })),
  withHooks({
    onInit(store) {
      store.loadIdentity();
    }
  })
);