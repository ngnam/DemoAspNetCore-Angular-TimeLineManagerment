import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostType } from 'src/app/domain/api-models/post-response';

export interface PostItem {
  id?: number;
  thumb?: string;
  type?: string;
  thumbs?: string[];
  title?: string;
  original?: string;
  duration?: number;
  description?: string;
  createAt?: number;
  url?: string;
}

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: PostItem;
  // tslint:disable-next-line: no-inferrable-types
  @Input() isRemove: boolean = false;
  @Output() remoteItem: EventEmitter<{ item: PostItem }> = new EventEmitter();

  postType = PostType;

  constructor() {}

  ngOnInit(): void {}

  onRemoveItem(item: PostItem) {
    this.remoteItem.emit({ item });
  }
}
