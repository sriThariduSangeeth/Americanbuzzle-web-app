import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private state: boolean = true;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private adminservice: AdminService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.adminservice.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login'], { relativeTo: this.activeRoute });
    return false;
    return true;
  }



}
