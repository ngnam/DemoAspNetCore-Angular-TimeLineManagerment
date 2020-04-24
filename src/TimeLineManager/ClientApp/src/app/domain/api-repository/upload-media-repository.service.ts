import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UploadMediaRepository } from './upload-media-repository';
import { UploadMediaResponse } from '../api-models/upload-media-response';
import { HttpApiService } from 'src/app/core/services/http-api.service';

const router = {
  uploadFile: 'file/upload'
};

@Injectable({ providedIn: 'root' })
export class UploadMediaRepositoryService extends UploadMediaRepository<UploadMediaResponse> {

  // single upload file
  uploadFile(fileToUpload: File, type?: string): Observable<UploadMediaResponse> {
    const formData: FormData = new FormData();
    formData.append(type, fileToUpload, fileToUpload.name);
    formData.append('type', type);
    return this.httpClient.post(router.uploadFile, formData);
  }

  constructor(private readonly httpClient: HttpApiService) {
    super();
  }
}
