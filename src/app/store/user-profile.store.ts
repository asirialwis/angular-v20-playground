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
  // 1. Config MUST be the first argument
  { providedIn: 'root' },

  // 2. Define State
  withState(() => {
    const saved = sessionStorage.getItem('sme_profile_form');
    return saved ? (JSON.parse(saved) as ProfileState) : initialState;
  }),

  // 3. Define Methods
  withMethods((store) => ({
    updateForm(fields: Partial<ProfileState>) {
      patchState(store, (state) => ({ ...state, ...fields }));
    },
    resetForm() {
      patchState(store, initialState);
      sessionStorage.removeItem('sme_profile_form');
    }
  })),

  // 4. Persistence Effect (This must be inside withHooks)
  withHooks({
    onInit(store) {
      effect(() => {
        // We access the signals from the store here
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