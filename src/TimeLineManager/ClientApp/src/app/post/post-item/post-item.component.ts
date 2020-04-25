import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostType, Post } from 'src/app/domain/api-models/post-response';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;
  // tslint:disable-next-line: no-inferrable-types
  @Input() isRemove: boolean = false;
  @Output() remoteItem: EventEmitter<{ item: Post }> = new EventEmitter();

  postType = PostType;

  constructor() {}

  ngOnInit(): void {}

  onRemoveItem(item: Post) {
    this.remoteItem.emit({ item });
  }
}
