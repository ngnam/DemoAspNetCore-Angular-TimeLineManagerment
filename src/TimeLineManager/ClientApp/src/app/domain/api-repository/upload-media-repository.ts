import { Observable } from 'rxjs';

export abstract class UploadMediaRepository<T> {
  abstract uploadFile(fileToUpload: File, type?: string): Observable<T>;
}
