import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('userToken');

    if (token == null) {
      this.toastr.error('You are not logged in');
      this.router.navigate(['/auth/login']);
      return false;
    }

    const decoded = JSON.parse(<string>localStorage.getItem('userData'));
    if (state.url.toLowerCase().indexOf('admin') > 0) {
      if (decoded.role == 'Admin') {
        return true;
      } else {
        this.toastr.error('You are not authorized to access this page');
        this.router.navigate(['/home']);
        return false;
      }
    } else if (state.url.toLowerCase().indexOf('user') > 0) {
      if (decoded.role == 'User' || decoded.role == 'Admin') {
        return true;
      } else {
        this.toastr.error('You are not authorized to access this page');
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.toastr.error('You are not authorized to access this page');
      this.router.navigate(['/home']);
      return false;
    }
  }

  //canActivate: [AutherizationGaurdGuard] in app routing module
}
