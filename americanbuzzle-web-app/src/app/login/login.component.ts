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
  error:string = '';
  returnUrl: string = '';
  loading: boolean = false;
  public signInData!: SignInData;

  constructor(private route: ActivatedRoute,
    private router: Router , private adminService : AdminService) { }

  ngOnInit(): void {
  }

  public submitLogin(): void {

    this.signInData = new SignInData(this.emailId,this.passwordId);
    this.adminService.login(this.signInData).subscribe(
      rsp =>{
        console.log("worked");
        this.router.navigate(['/admin']);
      },
      error =>{
        console.log("not worked");
      }  
    );
    
  }

}
