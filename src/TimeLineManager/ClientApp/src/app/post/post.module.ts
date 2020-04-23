import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostComponent } from './post.component';
import { TimelineImageComponent } from './timeline-image/timeline-image.component';
import { TimelineImagePopupComponent } from './timeline-image-popup/timeline-image-popup.component';
import { TimelineCouponComponent } from './timeline-coupon/timeline-coupon.component';
import { TimelineCouponPopupComponent } from './timeline-coupon-popup/timeline-coupon-popup.component';
import { TimelineLinkComponent } from './timeline-link/timeline-link.component';
import { TimelineLinkPopupComponent } from './timeline-link-popup/timeline-link-popup.component';
import { TimelineStickerComponent } from './timeline-sticker/timeline-sticker.component';
import { TimelineStickerPopupComponent } from './timeline-sticker-popup/timeline-sticker-popup.component';
import { TimelineSurveyComponent } from './timeline-survey/timeline-survey.component';
import { TimelineVideoComponent } from './timeline-video/timeline-video.component';
import { TimelineVideoPopupComponent } from './timeline-video-popup/timeline-video-popup.component';

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
    ...ENTRY_COMPONENTS
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
})
export class PostModule {}
