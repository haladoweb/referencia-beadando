import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../model/user.model';
import { computed, effect, inject } from '@angular/core';
import { LocalStorageKeys } from '../../../core/constants/local-storage-keys';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { tapResponse } from '@ngrx/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem(LocalStorageKeys.accessToken),
  user: null,
};

const decodeToken = (accessToken: string): User => jwtDecode<User>(accessToken);

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withDevtools('authStore'),
  withState(initialState),
  withComputed(({ accessToken }) => ({
    isLoggedIn: computed(() => !!accessToken()),
  })),
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    login: rxMethod<{ username: string; password: string }>(
      pipe(
        switchMap(({ username, password }) =>
          authService.login(username, password).pipe(
            tapResponse({
              next: ({ accessToken }) => {
                localStorage.setItem(LocalStorageKeys.accessToken, accessToken);
                patchState(store, { accessToken });
                router.navigateByUrl('');
              },
              error: () => {},
            })
          )
        )
      )
    ),
    logout: () => {
      patchState(store, { accessToken: null, user: null });
      localStorage.removeItem(LocalStorageKeys.accessToken);
      router.navigateByUrl('/login');
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const token = store.accessToken();
        if (!token) return;
        const user = decodeToken(token);
        patchState(store, { user });
      });
    },
  })
);
