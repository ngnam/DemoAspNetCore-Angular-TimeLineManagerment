import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostComponent } from './post.component';
import { TimelineImageComponent } from './components/timeline-image/timeline-image.component';
import { TimelineImagePopupComponent } from './components/timeline-image-popup/timeline-image-popup.component';
import { TimelineCouponComponent } from './components/timeline-coupon/timeline-coupon.component';
import { TimelineCouponPopupComponent } from './components/timeline-coupon-popup/timeline-coupon-popup.component';
import { TimelineLinkComponent } from './components/timeline-link/timeline-link.component';
import { TimelineLinkPopupComponent } from './components/timeline-link-popup/timeline-link-popup.component';
import { TimelineStickerComponent } from './components/timeline-sticker/timeline-sticker.component';
import { TimelineStickerPopupComponent } from './components/timeline-sticker-popup/timeline-sticker-popup.component';
import { TimelineSurveyComponent } from './components/timeline-survey/timeline-survey.component';
import { TimelineVideoComponent } from './components/timeline-video/timeline-video.component';
import { TimelineVideoPopupComponent } from './components/timeline-video-popup/timeline-video-popup.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';

const ENTRY_COMPONENTS = [
  TimelineImageComponent,
  TimelineImagePopupComponent,
  TimelineCouponComponent,
  TimelineCouponPopupComponent,
  TimelineLinkComponent,
  TimelineLinkPopupComponent,
  TimelineStickerComponent,
  TimelineStickerPopupComponent,
  TimelineSurveyComponent,
  TimelineStickerPopupComponent,
  TimelineVideoComponent,
  TimelineVideoPopupComponent,
];

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostItemComponent,
    ...ENTRY_COMPONENTS
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
})
export class PostModule {}
