import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
dbpath='/attachments'

storageRef:AngularFireStorageReference

  constructor(private storage:AngularFireStorage) {
this.storageRef=storage.ref(this.dbpath)
  }


Upload(file:File){

  const attachmentpath=`${this.dbpath}/${file.name}`
this.storageRef=this.storage.ref(attachmentpath)
  return this.storage.upload(attachmentpath,file).snapshotChanges()
}
getDownLoadURL(){
   return this.storageRef.getDownloadURL()
}




}
