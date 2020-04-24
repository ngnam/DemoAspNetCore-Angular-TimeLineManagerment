import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostStatus, PostType, PostDTOModel } from '../domain/api-models/post-response';
import { toTimestampFromDate } from '../core/base/helpers';
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
    isPublishNow: 1
  };

  private unsubcribe$ = new Subject<void>();

  private postTimeLineModel: Post = {
    id: 0,
    status: PostStatus.DRAFTED,
    type: PostType.IMAGE,
    createdAt: toTimestampFromDate(new Date()),
    updatedAt: toTimestampFromDate(new Date())
  };

  constructor(
    private route: ActivatedRoute,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>) {
      this.postModel.publishDate = this.today;
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
