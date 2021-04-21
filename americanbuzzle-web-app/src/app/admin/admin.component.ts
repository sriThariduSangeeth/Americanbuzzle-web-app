import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { Post } from '../model/post';
import { FileUploadService } from '../services/file-upload.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef;

  num: number = 1;
  message: string | any;
  imageName: any;
  fileName!: string;
  file!: File;
  files: File[] = [];
  url: string | any = "../../assets/upload.svg";

  ptitle = '';
  plink = '';
  pcategory!: Category;
  pdiscriptions = '';
  pstartdate!: string;
  penddate!: string;

  dimage!: FormData;

  categorys: Category[] = [];

  loginForm!: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private fileUploadService: FileUploadService,
    private router: Router, private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private admin: AdminService) { }
  ngOnInit(): void {
    this.getcategory();
  }

  public logout() {
    this.admin.doLogoutUser();
  }

  getcategory() {
    this.fileUploadService.getCategory().subscribe(
      rsp => {
        this.categorys = rsp.data;
      },
      err => {

      }
    );
  }

  submit() {
    const mStartDate = new Date(this.pstartdate);
    const mEndDate = new Date(this.penddate);
    const start = moment(mStartDate).format("YYYY/MM/DD");
    const end = moment(mEndDate).format("YYYY/MM/DD");
    console.log(this.pcategory);


    if (this.file != null) {
      const formData = new FormData();
      formData.append('postImg', this.file, this.file.name);
      let post = new Post(this.ptitle, this.pdiscriptions, this.pcategory.id, this.pcategory.categoryname, start, end, this.file.name, "", this.plink);
      formData.append('newpost', JSON.stringify(post));
      this.fileUploadService.upload(formData).subscribe(
        rsp => {
          if (rsp) {
            this.message = 'Image uploaded successfully';
            this.snackBar.open("Upload Post", "successfully", {
              duration: 2000,
            });
            this.router.navigate(['/admin']);
          }
        },
        error => {
          alert(error.error.data);
          this.router.navigate(['/admin']);
        });
    }
  };


  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    if (event.target.files.length != 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = reader.result;
      };
      reader.readAsDataURL(this.file);
    }

  }

}
