import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { FileUploadService } from '../services/file-upload.service';
import { Post } from '../model/post';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  cards: Post[] = [];
  post!: Post;

  constructor(private breakpointObserver: BreakpointObserver, private fileUploadService: FileUploadService) {
    console.log("this is priont");

    this.getPostDetails();
    this.slidesStore = [
      { "id": "0", "src": "../assets/t2.jpg", "alt": "test", "title": "test" },
      { "id": "1", "src": "../assets/t3.jpg", "alt": "test", "title": "test" },
      { "id": "2", "src": "../assets/t4.jpg", "alt": "test", "title": "test" },
      { "id": "3", "src": "../assets/t5.jpg", "alt": "test", "title": "test" }];
  }

  slidesStore: { id: string, src: string, alt: string, title: string }[] = [];

  activeSlides: SlidesOutputData = new SlidesOutputData;

  getPostDetails() {
    this.fileUploadService.getAllPost().subscribe(
      rsp => {
        console.log("call get post");
        console.log(rsp.data);

        this.cards = rsp.data;
      },
      err => {

      }
    );
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    animateOut: 'animate__animated animate__slideOutDown',
    animateIn: 'animate__animated animate__flipInX',
    autoplaySpeed: 800,
    autoplayTimeout: 5000,
    navSpeed: 700,
    navText: ['Next', 'Prev'],
    slideBy: 'page',
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      400: {
        items: 2,
        nav: false
      },
      740: {
        items: 3,
        nav: false
      },
      940: {
        items: 2,
        nav: false
      }
    },
    nav: false,
  }
}
