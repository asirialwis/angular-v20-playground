import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { effect } from '@angular/core';

export interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  businessTaxId: string;
}

const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  email: '',
  businessTaxId: '',
};

export const UserProfileStore = signalStore(
  { providedIn: 'root' },
  withState(() => {
    const saved = sessionStorage.getItem('sme_profile_form');
    return saved ? (JSON.parse(saved) as ProfileState) : initialState;
  }),
  withMethods((store) => ({
    updateForm(fields: Partial<ProfileState>) {
      patchState(store, (state) => ({ ...state, ...fields }));
    },
    resetForm() {
      patchState(store, initialState);
      sessionStorage.removeItem('sme_profile_form');
    }
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = {
          firstName: store.firstName(),
          lastName: store.lastName(),
          email: store.email(),
          businessTaxId: store.businessTaxId()
        };
        sessionStorage.setItem('sme_profile_form', JSON.stringify(state));
      });
    },
  })
);