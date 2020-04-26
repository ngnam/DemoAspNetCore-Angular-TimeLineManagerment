import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostItemComponent,
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
})
export class PostModule {}
