import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  const cachedUser = userService.currentUser();
  if (cachedUser) {
    if (cachedUser.roleName === 'ADMIN') {
      return true;
    }
    router.navigate(['/homepage']);
    return false;
  }

  return userService.getCurrentUser().pipe(
    map((user) => {
      if (user.roleName === 'ADMIN') {
        return true;
      }
      router.navigate(['/homepage']);
      return false;
    }),
  );
};
