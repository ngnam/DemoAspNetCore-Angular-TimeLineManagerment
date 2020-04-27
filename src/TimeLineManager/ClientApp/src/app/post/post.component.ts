import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, Type, ComponentRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbCalendar, NgbDateAdapter, NgbTimeAdapter, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { Post, PostStatus, PostType, PostDTOModel, PostParseJSON } from '../domain/api-models/post-response';
import { toTimestampFromDate, toTimeFormat, getTimeZoneInfoDisplayName } from '../core/base/helpers';
import { NgForm } from '@angular/forms';
import { PostRepositoryMapper } from '../domain/api-repository/mappers/post-repository.mapper';
import { PostParserJSONMapper } from '../domain/api-repository/mappers/post-parseJSON.mapper';
import { ToastService } from '../shared/components/toast-container/toast-service';
import { OptionsToast } from '../core/configs/toast.config';
import { PostRepositoryService } from '../domain/api-repository/post-repository.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  title = 'Timeline post';
  btnSaveDraft = 'Save draft';
  btnSubmit = 'Publish';

  postType = PostType;
  postModel: PostDTOModel = {
    isPublishNow: 1,
    postType: PostType.IMAGE,
    images: null
  };

  GTMTime = getTimeZoneInfoDisplayName();

  PostTypeItems: { id: PostType; name: string; icon: string; order: number; }[] = [];

  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new post,
  // and not NULL when we're editing an existing one.
  id?: number;
  postModelClone: PostDTOModel;

  private unsubcribe$ = new Subject<void>();

  @ViewChild('contentContainer', { read: ViewContainerRef }) contentContainer: ViewContainerRef;

  private readonly mapper = new PostRepositoryMapper();
  private readonly mapperPost = new PostParserJSONMapper();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private toastService: ToastService,
    private postRepositoryService: PostRepositoryService) {
      this.postModel.publishDate = this.today;
      this.postModel.publishTime = toTimeFormat(new Date(), 'HH:mm');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  ngOnInit() {
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
    this.loadData();
  }

  loadData() {
    // retrieve the ID from the 'id'
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id && this.id !== 0) {
    // EDIT MODE
    // fetch the post from the server
    this.postRepositoryService.getById(this.id)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(result => {
        if (result.resultCode === 1 && result.resultData) {
          this.title = 'Edit - Timeline post: ' + result.resultData.id;
          // update the form with the post value
          const post = this.mapperPost.mapTo(result.resultData);
          this.postModel = this.mapper.mapFrom(post);
          this.postModelClone = this.postModel;
          this.loadComponent(this.postModel.postType, this.postModel);
        }
        if (result.errorDisplay && result.errorMessage) {
          // notification error
          console.log(result.errorMessage);
          this.toastService.show(result.errorMessage, OptionsToast.danger);
          // go back to posts view
          this.router.navigate(['/post']);
        }
      });
    } else {
      // ADD NEW MODE
      this.title = 'Create a Timeline post';
      console.log(this.postModel);

      this.loadComponent(this.postModel.postType);
    }
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
    const postParseJSON = this.mapperPost.mapFrom(postResponse);
    // call api
    console.log('postParseJSON', postParseJSON);
    if (this.id && this.id !== 0) {
      // mode edit
      this.onSaveOrUpdate(postParseJSON, this.id);
    } else {
      // mode create
      this.onSaveOrUpdate(postParseJSON);
    }
  }

  onSaveDraft(f: NgForm) {
    if (f.form.invalid) { return; }
    this.postModel.postStatus = PostStatus.DRAFTED;
    // mapTo
    const postResponse = this.mapper.mapTo(this.postModel);
    const postParseJSON = this.mapperPost.mapFrom(postResponse);

    // call api
    console.log(postParseJSON);
    if (this.id && this.id !== 0) {
      // mode edit
      this.onSaveOrUpdate(postParseJSON, this.id);
    } else {
      // mode create
      this.onSaveOrUpdate(postParseJSON);
    }
  }

  onCancel() {
    this.router.navigateByUrl(`/post`);
  }

  async loadComponent(contentType: PostType, postModel?: PostDTOModel) {
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
        if (this.id && this.id !== 0 && crImage.instance.images && postModel && postModel.images) {
          crImage.instance.images = postModel.images;
        }
        if (crImage.instance.UploadImage) {
          crImage.instance.UploadImage
          .pipe(takeUntil(this.unsubcribe$))
          .subscribe(data => { this.postModel.images = data; });
        }
        break;
      case PostType.VIDEO:
        this.postModel.coupon = null;
        this.postModel.link = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineVideoComponent } = await import('./components/timeline-video/timeline-video.component');
        const crVideo = this.createComponentLazyload(TimelineVideoComponent);
        if (this.id && this.id !== 0 && crVideo.instance.video && postModel && postModel.video) {
          crVideo.instance.video = postModel.video;
        }
        if (crVideo.instance.UploadVideo) {
          crVideo.instance.UploadVideo
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(data => this.postModel.video = data);
        }
        break;
      case PostType.COUPON:
        this.postModel.video = null;
        this.postModel.link = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineCouponComponent } = await import('./components/timeline-coupon/timeline-coupon.component');
        const crCoupon = this.createComponentLazyload(TimelineCouponComponent);
        if (this.id && this.id !== 0 && crCoupon.instance.coupon && postModel && postModel.coupon) {
          crCoupon.instance.coupon = postModel.coupon;
        }
        if (crCoupon.instance.SelectItem) {
          crCoupon.instance.SelectItem
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(data => this.postModel.coupon = data);
        }
        break;
      case PostType.LINK:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.sticker = null;
        const { TimelineLinkComponent } = await import('./components/timeline-link/timeline-link.component');
        const crLink = this.createComponentLazyload(TimelineLinkComponent);
        if (this.id && this.id !== 0 && crLink.instance.link && postModel && postModel.link) {
          crLink.instance.link = postModel.link;
        }
        if (crLink.instance.SelectItem) {
          crLink.instance.SelectItem
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(data => this.postModel.link = data);
        }
        break;
      case PostType.STICKER:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.survey = null;
        this.postModel.link = null;
        const { TimelineStickerComponent } = await import('./components/timeline-sticker/timeline-sticker.component');
        const crSticker = this.createComponentLazyload(TimelineStickerComponent);
        if (this.id && this.id !== 0 && crSticker.instance.sticker && postModel && postModel.sticker) {
          crSticker.instance.sticker = postModel.sticker;
        }
        if (crSticker.instance.SelectItem) {
          crSticker.instance.SelectItem
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(data => this.postModel.sticker = data);
        }
        break;
      case PostType.SURVEY:
        this.postModel.video = null;
        this.postModel.coupon = null;
        this.postModel.images = null;
        this.postModel.sticker = null;
        this.postModel.link = null;
        const { TimelineSurveyComponent } = await import('./components/timeline-survey/timeline-survey.component');
        const crSurvey = this.createComponentLazyload(TimelineSurveyComponent);
        if (this.id && this.id !== 0 && crSurvey.instance.survey && postModel && postModel.survey) {
          crSurvey.instance.survey = postModel.survey;
        }
        if (crSurvey.instance.SelectItem) {
          crSurvey.instance.SelectItem
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(data => this.postModel.survey = data);
        }
      break;
    }
  }

  private createComponentLazyload<T>(component: Type<T>): ComponentRef<T> {
    const componentFactory = this.cfr.resolveComponentFactory(component);
    this.contentContainer.clear();
    return this.contentContainer.createComponent(componentFactory, null, this.injector);
  }

  private onSaveOrUpdate(params: PostParseJSON, id?: number) {
    if (!id || params.id === 0) {
      // create mode
      this.postRepositoryService.create(params)
        .pipe(takeUntil(this.unsubcribe$))
        .subscribe(data => {
          if (data.resultCode === 1 && data.resultData) {
            console.log(data);
            this.toastService.show('Đã thêm mới time line thành công', OptionsToast.success);
            // go back to posts view
            this.router.navigate(['/post']);
          }
          if (data.errorDisplay && data.errorMessage) {
            // notification error
            console.log(data.errorMessage);
            this.toastService.show(data.errorMessage, OptionsToast.danger);
          }
        });
    } else {
      // edit mode
      this.postRepositoryService.update(id, params)
        .pipe(takeUntil(this.unsubcribe$))
        .subscribe(data => {
          if (data.resultCode === 1 && data.resultData) {
            console.log(data);
            this.toastService.show('Cập nhật time line thành công', OptionsToast.success);
            // go back to posts view
            this.router.navigate(['/post']);
          }
          if (data.errorDisplay && data.errorMessage) {
            // notification error
            console.log(data.errorMessage);
            this.toastService.show(data.errorMessage, OptionsToast.danger);
          }
        });
    }
  }

}
