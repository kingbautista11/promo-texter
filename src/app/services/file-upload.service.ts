import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { pipe, switchMap } from 'rxjs';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: Storage) {}

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
