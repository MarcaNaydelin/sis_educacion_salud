import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder } from '@casl/ability';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class SessionService{

  constructor(
    private ability: Ability
  ) {
  }

  loadSession() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const token = JSON.parse(user)?.access_token;
      if (token) {
        let data: any = jwtDecode(token)
        localStorage.setItem('dataUser', JSON.stringify(data.user));
        this.updateAbility(data);
      }
    }
  }

  updateAbility(token: any) {
      const { can, rules } = new AbilityBuilder(Ability);
      if (token?.permissions) {
        token.permissions.forEach((permission: string) => {
          const parts = permission.split('.');
          const subject = parts[0];
          const action = parts.slice(1).join('.');
          can(action, subject);
        });
      }
      this.ability.update(rules);
    }

    getAbility(): Ability {
      return this.ability;
    }

    clearSession() {
      this.ability.update([]);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('dataUser');
    }
}
