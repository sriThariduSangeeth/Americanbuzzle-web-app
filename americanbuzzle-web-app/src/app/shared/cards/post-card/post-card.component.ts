import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post!: Post;
  @Input() titel!: string;

  constructor() {
    console.log(this.titel);
  }

  ngOnInit(): void {
  }

  submit() {

  }
}
