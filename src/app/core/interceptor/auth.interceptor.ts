import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (
    token &&
    !req.url.match(/\/auth\/login(\?|$)/) &&
    !req.url.match(/\/auth\/register(\?|$)/) &&
    !req.url.match(/\.(jpg|jpeg|png|gif|svg|css|js|ico)$/)
  ) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }
  return next(req);
};