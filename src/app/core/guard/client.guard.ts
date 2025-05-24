import { CanActivateFn } from '@angular/router';

export const ClientGuard: CanActivateFn = (route, state) => {
  return true;
};
