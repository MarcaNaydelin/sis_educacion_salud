import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Ability } from '@casl/ability';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private ability: Ability, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const subject = route.data['subject'];
    const action = route.data['action'];

    if (this.ability.can(action, subject)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
