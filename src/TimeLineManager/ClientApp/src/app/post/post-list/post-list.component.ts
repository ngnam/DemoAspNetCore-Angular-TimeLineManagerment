import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostRepositoryService } from 'src/app/domain/api-repository/post-repository.service';
import { Observable, Subject } from 'rxjs';
import { PostType, Post } from 'src/app/domain/api-models/post-response';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  items: Post[];
  private unsubcribe$ = new Subject<void>();
  constructor(private readonly postRepositoryService: PostRepositoryService) { }

  ngOnInit(): void {
    this.postRepositoryService.getAll()
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(data => {
        if (data.resultCode === 1 && data.resultData) {
          this.items = data.resultData;
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
        }
      });
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
