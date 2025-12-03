import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface SpinnerState {
  isSpinning: boolean;
}

const initialState: SpinnerState = {
  isSpinning: false,
};

export const SpinnerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    show: () => patchState(store, { isSpinning: true }),
    hide: () => patchState(store, { isSpinning: false }),
  }))
);
