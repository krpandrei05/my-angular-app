import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import LocalStorageUtils from '../utils/local-storage-utils';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = LocalStorageUtils.getItem(LocalStorageUtils.tokenKey);

  if (token) {
    router.navigate(['/homepage']);
    return false;
  }

  return true;
}
