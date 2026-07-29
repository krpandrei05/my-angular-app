import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import LocalStorageUtils from '../utils/local-storage-utils';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  if (req.url.includes('login') || req.url.includes('register')) {
    return next(req);
  }

  const token: string | null = LocalStorageUtils.getItem(LocalStorageUtils.tokenKey);
  let processedRequest;
  if (token) {
    processedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  } else {
    processedRequest = req;
  }

  return next(processedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        userService.logout();
      }
      return throwError(() => error);
    })
  );
};
