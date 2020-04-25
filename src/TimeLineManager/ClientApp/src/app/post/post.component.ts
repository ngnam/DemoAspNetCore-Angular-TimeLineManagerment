import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbCalendar, NgbDateAdapter, NgbTimeAdapter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostStatus, PostType, PostDTOModel } from '../domain/api-models/post-response';
import { toTimestampFromDate, toTimeFormat, getTimeZoneInfoDisplayName } from '../core/base/helpers';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  btnSaveDraft = 'Save draft';
  btnSubmit = 'Publish';

  postModel: PostDTOModel = {
    isPublishNow: 1,
    postType: PostType.IMAGE
  };

  GTMTime = getTimeZoneInfoDisplayName();

  PostTypeItems: { id: PostType; name: string; icon: string; order: number; }[] = [];

  private unsubcribe$ = new Subject<void>();

  private postTimeLineModel: Post = {
    id: 0,
    status: PostStatus.DRAFTED,
    type: PostType.IMAGE,
    scheduledTime: toTimestampFromDate(new Date())
  };

  constructor(
    private route: ActivatedRoute,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>) {
      this.postModel.publishDate = this.today;
      this.postModel.publishTime = toTimeFormat(new Date(), 'HH:mm');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.unsubcribe$),
      )
      .subscribe(params => {
        console.log(params); // {id: 123}
      });
    this.PostTypeItems = [
      { id: PostType.COUPON, name: 'Coupon', icon: 'fa fa-columns', order: 4 },
      { id: PostType.IMAGE, name: 'Image', icon: 'fa fa-picture-o', order: 1  },
      { id: PostType.LINK, name: 'Link', icon: 'fa fa-link', order: 5  },
      { id: PostType.STICKER, name: 'Sticker', icon: 'fa fa-smile-o', order: 3  },
      { id: PostType.SURVEY, name: 'Survey', icon: 'fa fa-list', order: 6  },
      { id: PostType.VIDEO, name: 'Video', icon: 'fa fa-play-circle-o', order: 2  },
    ].sort((a, b) => {
      if (a.order > b.order) { return 1; }
      if (b.order > a.order) { return -1; }
      return 0;
    });
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  onSavePublish(f: NgForm) {
    this.postModel.postStatus = PostStatus.PUBLISHED;
    console.log(this.postModel);
    // mapTo

    // call api
  }

  onSaveDraft(f: NgForm) {
    if (f.form.valid) {
      this.postModel.postStatus = PostStatus.DRAFTED;
      console.log(this.postModel);
    }
    // mapTo

    // call api
  }

  loadComponent(contentType: PostType) {

  }

  private onSaveOrUpdate(params: Post, id?: number) {
  }

}
