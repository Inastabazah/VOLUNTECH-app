import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { BehaviorSubject, map,Observable } from 'rxjs';
import { Activity } from '../../intrerfaces/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class NgoActivityService {
dbpath='/activity'
requestPath='/requestActivity'
approvedPath='/approvedRequest'
dbRef:AngularFireList<Activity>
dbReferance:AngularFireList<Activity>
requestData = new BehaviorSubject<any>({});
userId: string = '';
  constructor(private angularFireDataBase:AngularFireDatabase) {
    this.dbRef=angularFireDataBase.list(this.dbpath)
    this.dbReferance=angularFireDataBase.list(this.requestPath)
   }

   create(data:Activity){
    return this.dbRef.push(data)

   }
   createRequest(data:Activity){
    return this.angularFireDataBase.list(this.requestPath).push(data)

   }

   update(key:string,data:Activity){
return this.dbRef.update(key,data)
   }

   delete(key:string){
    return this.dbRef.remove(key)
   }
deleteAll(){
  return this.dbRef.remove()
}


getById(key:string){
return this.angularFireDataBase.object(`${this.dbpath}/${key}`).valueChanges()
}


getAll():Observable<any>{

  return this.dbRef.snapshotChanges().pipe(
    map((changes)=>
      changes.map((obj)=> ({key:obj.payload.key, ...obj.payload.val()}))
    )
  )


  }



  getAllRequestData():Observable<any>{
    return this.dbReferance.snapshotChanges().pipe(
      map((changes)=>
        changes.map((obj)=> ({key:obj.payload.key, ...obj.payload.val()}))
      )
    )


  }

  getRequestById(key:string){
    return this.angularFireDataBase.object(`${this.requestPath}/${key}`).valueChanges()
  }

  getUserRequest(): Observable<any> {
    return this.angularFireDataBase.list<Activity>(this.requestPath, ref => ref.orderByChild('userId').equalTo('userId'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({key: obj.payload.key, ...obj.payload.val()}))
        )
      );
  }

  creatWhenApproved(data:Activity){
    return this.angularFireDataBase.list(this.approvedPath).push(data)
  }
  deleteRequest(key:string|undefined){
return this.angularFireDataBase.list(this.requestPath).remove(key)
  }


  getUserRequestId(userId: string) {
    return this.angularFireDataBase
     .object(this.requestPath + '/' + userId)
     .valueChanges()
     .subscribe((request) => {
       this.requestData.next(request);
     });
 }
}
