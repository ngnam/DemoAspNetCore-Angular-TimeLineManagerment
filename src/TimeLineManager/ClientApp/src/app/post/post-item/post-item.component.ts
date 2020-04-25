import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostType, Post } from 'src/app/domain/api-models/post-response';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;

  postType = PostType;

  constructor() {}

  ngOnInit(): void {}
}
