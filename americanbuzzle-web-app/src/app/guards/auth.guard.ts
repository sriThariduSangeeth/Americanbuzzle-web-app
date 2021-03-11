import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private state: boolean = true;
  constructor( private router: Router , private activeRoute : ActivatedRoute) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      // if () {
      //   return true;
      // }
      //   this.router.navigate(['login'], {relativeTo: this.activeRoute});
      //   return false;
      return true;
  }


  
}
