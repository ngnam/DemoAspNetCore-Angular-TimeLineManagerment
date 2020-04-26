import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, Type, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbCalendar, NgbDateAdapter, NgbTimeAdapter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostStatus, PostType, PostDTOModel } from '../domain/api-models/post-response';
import { toTimestampFromDate, toTimeFormat, getTimeZoneInfoDisplayName } from '../core/base/helpers';
import { NgForm } from '@angular/forms';
import { PostRepositoryMapper } from '../domain/api-repository/mappers/post-repository.mapper';

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

  private readonly mapper = new PostRepositoryMapper();

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
    if (f.form.invalid) { return; }
    this.postModel.postStatus = PostStatus.PUBLISHED;
    // mapTo
    const postResponse = this.mapper.mapTo(this.postModel);
    // call api
    console.log(postResponse);
  }

  onSaveDraft(f: NgForm) {
    if (f.form.invalid) { return; }
    this.postModel.postStatus = PostStatus.DRAFTED;
    // mapTo
    const postResponse = this.mapper.mapTo(this.postModel);
    // call api
    console.log(postResponse);
  }

  async loadComponent(contentType?: PostType) {
    this.postModel.postType = contentType;
    switch (contentType) {
      case PostType.IMAGE:
        this.postModel.coupon = null;
        this.postModel.link = null;
        this.postModel.video = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineImageComponent } = await import('./components/timeline-image/timeline-image.component');
        const crImage = this.createComponentLazyload(TimelineImageComponent);
        crImage.instance.getImages().pipe(takeUntil(this.unsubcribe$)).subscribe(data => this.postModel.images = data);
        break;
      case PostType.VIDEO:
        this.postModel.coupon = null;
        this.postModel.link = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineVideoComponent } = await import('./components/timeline-video/timeline-video.component');
        const crVideo = this.createComponentLazyload(TimelineVideoComponent);
        crVideo.instance.getVideo().pipe(takeUntil(this.unsubcribe$)).subscribe(data => this.postModel.video = data);
        break;
      case PostType.COUPON:
        this.postModel.video = null;
        this.postModel.link = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineCouponComponent } = await import('./components/timeline-coupon/timeline-coupon.component');
        const crCoupon = this.createComponentLazyload(TimelineCouponComponent);
        break;
      case PostType.LINK:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineLinkComponent } = await import('./components/timeline-link/timeline-link.component');
        const crLink = this.createComponentLazyload(TimelineLinkComponent);
        break;
      case PostType.STICKER:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.link = null;
        const { TimelineStickerComponent } = await import('./components/timeline-sticker/timeline-sticker.component');
        const crSticker = this.createComponentLazyload(TimelineStickerComponent);
        break;
      case PostType.SURVEY:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.sticker = null;
        this.postModel.link = null;
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
