import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostRepositoryService } from 'src/app/domain/api-repository/post-repository.service';
import { Subject } from 'rxjs';
import { Post } from 'src/app/domain/api-models/post-response';
import { takeUntil } from 'rxjs/operators';
import { PostParserJSONMapper } from 'src/app/domain/api-repository/mappers/post-parseJSON.mapper';
import { ToastService } from 'src/app/shared/components/toast-container/toast-service';
import { OptionsToast } from 'src/app/core/configs/toast.config';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  items: Post[];
  private unsubcribe$ = new Subject<void>();
  private readonly mapper = new PostParserJSONMapper();
  constructor(
    private readonly postRepositoryService: PostRepositoryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.postRepositoryService
      .getAll()
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((data) => {
        if (data.resultCode === 1 && data.resultData) {
          if (data.resultData.list && data.resultData.list.length > 0) {
            this.items = data.resultData.list.map((item) =>
              this.mapper.mapTo(item)
            );
          } else {
            this.items = [];
          }
          console.log(this.items);
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
          this.toastService.show(data.errorMessage, OptionsToast.danger);
        }
      });
  }

  onDeleteItem(id: number) {
    this.postRepositoryService
      .delete(id)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((data) => {
        if (data.resultCode === 1 && data.resultData) {
          this.toastService.show('Xóa item thành công!', OptionsToast.success);
          // loadData
          this.loadData();
        }
        if (data.errorDisplay && data.errorMessage) {
          // notification error
          console.log(data.errorMessage);
          this.toastService.show(data.errorMessage, OptionsToast.danger);
        }
      });
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
