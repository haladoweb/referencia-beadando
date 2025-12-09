import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { LocalStorageKeys } from '../constants/local-storage-keys';
import { computed } from '@angular/core';

interface ThemeState {
  currentTheme: string;
}

enum Themes {
  dark = 'dark',
  light = 'light',
}

const initialState: ThemeState = {
  currentTheme: localStorage.getItem(LocalStorageKeys.theme) ?? Themes.dark,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentTheme }) => ({
    isDark: computed(() => currentTheme() === Themes.dark),
  })),
  withMethods((store) => ({
    switchTheme: () => {
      const newTheme = store.currentTheme() === Themes.dark ? Themes.light : Themes.dark;

      if (newTheme === Themes.dark) {
        document.documentElement.setAttribute('data-theme', 'spotify');
      } else {
        document.documentElement.setAttribute('data-theme', 'soft');
      }

      patchState(store, { currentTheme: newTheme });
      localStorage.setItem(LocalStorageKeys.theme, newTheme);
    },
    restoreTheme: () =>
      document.documentElement.setAttribute(
        'data-theme',
        store.currentTheme() === Themes.dark ? 'spotify' : 'soft'
      ),
  })),
  withHooks({
    onInit: (store) => {
      store.restoreTheme();
    },
  })
);
