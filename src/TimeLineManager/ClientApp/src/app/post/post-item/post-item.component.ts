import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostType, Post } from 'src/app/domain/api-models/post-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() item: Post;
  @Output() removeItem: EventEmitter<number> = new EventEmitter();

  postType = PostType;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEdit(id: number) {
    this.router.navigateByUrl(`/post/${id}/edit`);
  }

  onDeleteItem(id: number) {
    if (confirm('confirm delete it?')) {
      this.removeItem.emit(id);
    }
  }
}
