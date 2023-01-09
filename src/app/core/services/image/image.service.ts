import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  dbpath='/files'

  storageRef!:AngularFireStorageReference

  logopath = '';
  formGroup!: FormGroup;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  downloadUrl: string='';
  constructor(private storage:AngularFireStorage,  private af: AngularFireStorage) {
    this.storageRef=storage.ref(this.dbpath)
  }


  Upload(file:File){

    const logopath=`${this.dbpath}/${file.name}`
  this.storageRef=this.storage.ref(logopath)
    return this.storage.upload(logopath,file).snapshotChanges()
  }
  getDownLoadURL(){
     return this.storageRef.getDownloadURL()
  }


  uploadLogo(files:File) {
    const filePath = `/files/${this.logo.value.files[0]}/${this.logo.value.files[0].name}`;
    const storageRef = this.af.ref(filePath);
    const uploadTask = this.af.upload(filePath, this.logo.value.files[0]);

 return   uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.downloadUrl = downloadURL;
          });
        })
      )
      ;
  }
  get logo() {
    return this.formGroup.controls['logo'] as FormControl;
  }
}
