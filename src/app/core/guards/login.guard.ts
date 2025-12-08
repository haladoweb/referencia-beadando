import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

export const loginGuard: CanActivateFn = () => {
  const { isLoggedIn } = inject(AuthStore);
  const router = inject(Router);

  if (isLoggedIn()) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
