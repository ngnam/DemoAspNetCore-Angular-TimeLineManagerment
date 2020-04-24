import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostItem } from '../post-item/post-item.component';
import { PostRepositoryService } from 'src/app/domain/api-repository/post-repository.service';
import { Observable, Subject } from 'rxjs';
import { PostType, Post } from 'src/app/domain/api-models/post-response';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  items: PostItem[];
  private unsubcribe$ = new Subject<void>();
  constructor(private readonly postRepositoryService: PostRepositoryService) { }

  ngOnInit(): void {
    this.postRepositoryService.getAll().subscribe(data => {
      if (data.resultCode === 1 && data.resultData) {
        this.items = data.resultData.map(post => this.mapFromPost(post));
      }
    });
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  private mapFromPost(post: Post): PostItem {
    const item: PostItem = {
      id: post.id,
      createAt: post.createdAt,
      type: post.type,
    };
    if (post.type === PostType.IMAGE) {
      item.thumbs = post.images.map(img => img.thumb);
    }
    if (post.type === PostType.VIDEO) {
      item.thumb = post.video.thumb;
      item.title = post.video.original;
    }
    if (post.type === PostType.COUPON) {
      item.thumb = post.coupon.thumbnail;
      item.title = post.coupon.title;
    }
    if (post.type === PostType.LINK) {
      item.thumb = post.link.thumbnail;
      item.title = post.link.title;
      item.description = post.link.desc;
      item.url = post.link.url;
    }
    if (post.type === PostType.STICKER) {
      item.thumb = post.sticker.url;
    }
    if (post.type === PostType.SURVEY) {
      item.thumb = post.survey.thumbnail;
      item.title = post.survey.title;
    }
    return item;
  }
}
