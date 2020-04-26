import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, Type, ComponentRef } from '@angular/core';
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

  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer: ViewContainerRef;

  private postTimeLineModel: Post = {
    id: 0,
    status: PostStatus.DRAFTED,
    type: PostType.IMAGE,
    scheduledTime: toTimestampFromDate(new Date())
  };

  constructor(
    private route: ActivatedRoute,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private cfr: ComponentFactoryResolver,
    private injector: Injector) {
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
    this.loadComponent(this.postModel.postType);
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

  async loadComponent(contentType?: PostType) {
    this.postModel.postType = contentType;
    switch (contentType) {
      case PostType.IMAGE:
        const { TimelineImageComponent } = await import('./components/timeline-image/timeline-image.component');
        const crImage = this.createComponentLazyload(TimelineImageComponent);
        break;
      case PostType.VIDEO:
        const { TimelineVideoComponent } = await import('./components/timeline-video/timeline-video.component');
        const crVideo = this.createComponentLazyload(TimelineVideoComponent);
        break;
      case PostType.COUPON:
        const { TimelineCouponComponent } = await import('./components/timeline-coupon/timeline-coupon.component');
        const crCoupon = this.createComponentLazyload(TimelineCouponComponent);
        break;
      case PostType.LINK:
        const { TimelineLinkComponent } = await import('./components/timeline-link/timeline-link.component');
        const crLink = this.createComponentLazyload(TimelineLinkComponent);
        break;
      case PostType.STICKER:
        const { TimelineStickerComponent } = await import('./components/timeline-sticker/timeline-sticker.component');
        const crSticker = this.createComponentLazyload(TimelineStickerComponent);
        break;
      case PostType.SURVEY:
        const { TimelineSurveyComponent } = await import('./components/timeline-survey/timeline-survey.component');
        const crSurvey = this.createComponentLazyload(TimelineSurveyComponent);
      break;
    }
  }

  private createComponentLazyload<T>(component: Type<T>): ComponentRef<T> {
    const componentFactory = this.cfr.resolveComponentFactory(component);
    this.contentContainer.clear();
    return this.contentContainer.createComponent(componentFactory, null, this.injector);
  }

  private onSaveOrUpdate(params: Post, id?: number) {

  }

}
