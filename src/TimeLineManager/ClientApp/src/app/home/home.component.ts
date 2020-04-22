import { Component } from '@angular/core';
import { PostRepositoryService } from '../domain/api-repository/post-repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private postRepo: PostRepositoryService) {
    this.postRepo.getTimeLine().subscribe(data => {
      console.log(data);
    })
  }
}
