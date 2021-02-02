import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  slidesStore: { id: string, src: string , alt:string , title:string}[] = [];
  
  activeSlides: SlidesOutputData = new SlidesOutputData;

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log("this is priont");
    
    this.slidesStore = [
      { "id": "0", "src": "../assets/t2.jpg", "alt":"test" , "title":"test" },
      { "id": "1", "src": "../assets/t3.jpg" , "alt":"test" , "title":"test"},
      { "id": "2", "src": "../assets/t4.jpg" , "alt":"test" , "title":"test"},
      { "id": "3", "src": "../assets/t5.jpg" , "alt":"test" , "title":"test"}];
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
    nav:false,
  }
}
