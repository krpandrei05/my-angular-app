import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import LocalStorageUtils from '../utils/local-storage-utils';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = LocalStorageUtils.getItem(LocalStorageUtils.tokenKey);

  if (token) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
