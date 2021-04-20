import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInData } from '../model/signInData';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailId: string = '';
  passwordId: string = '';
  error: string = '';
  returnUrl: string = '';
  loading: boolean = false;
  public signInData!: SignInData;

  constructor(private route: ActivatedRoute,
    private router: Router, private adminService: AdminService) {
    if (this.adminService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  public submitLogin(): void {

    this.signInData = new SignInData(this.emailId, this.passwordId);
    this.loading = true;
    this.adminService.login(this.signInData).subscribe(
      success => {
        this.router.navigate([this.returnUrl]);
        this.loading = false;
        // this.router.navigate(['/admin']);
      },
      error => {
        this.error = error;
        this.loading = false;
        this.adminService.doLogoutUser();
      }
    );

  }

}
