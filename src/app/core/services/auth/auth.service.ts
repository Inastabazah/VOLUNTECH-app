import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { UserCredential } from '@firebase/auth-types';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Users } from '../../intrerfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));
  dbUsersPath = '/Technologist and Ngos';
  userId: string = '';

  userData = new BehaviorSubject<any>({});
  dbRef: AngularFireList<Users>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.dbRef = angularFireDatabase.list(this.dbUsersPath);
    this.authStateSubscribe();
  }

  authStateSubscribe() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        if (!this.isLoggedIn) {
          this.router.navigate(['/layout']);
        }
        this.getUserId(user.uid);

        localStorage.setItem('userId', user.uid);
        this.isLoggedIn$.next(true);
      } else {
        localStorage.removeItem('userId');
        this.isLoggedIn$.next(false);
        this.router.navigate(['/home']);
      }
    });
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    );
  }

  creatTechuser(
    userId: string,
    fullName: string,
    email: string,

    phoneNumber: number,
    city: string,
    skills: string,
    jobExperiences: string,
    availableTime:string,
    courses: string,

  ): Observable<any> {
    const techObjFD = this.angularFireDatabase.list(this.dbUsersPath);
    this.userId = userId;
    return from(
      techObjFD.update(userId, {
        userId: userId,
        fullName: fullName,
        email: email,

        phoneNumber: phoneNumber,
        city: city,
        skills: skills,
        jobExperiences: jobExperiences,
        courses: courses,
        availableTime:availableTime,
        roll: 'Tech',

      })
    );
  }

  creatNgouser(
    userId: string,
    companyName: string,
    email: string,

    phoneNumber: number,
    companyWebsite: string,
    type:string,
    logo?: string,

  ): Observable<any> {
    const ngoObjFD = this.angularFireDatabase.list(this.dbUsersPath);
    return from(
      ngoObjFD.update(userId, {
        userId: userId,
        companyName: companyName,
        email: email,

        phoneNumber: phoneNumber,
        companyWebsite: companyWebsite,
        type:type,
        logo: logo,
        roll: 'Ngo',

      })
    );
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  getUserId(userId: string) {
     return this.angularFireDatabase
      .object(this.dbUsersPath + '/' + userId)
      .valueChanges()
      .subscribe((user) => {
        this.userData.next(user);
      });
  }

  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          this.router.navigate(['/auth/login']);
          window.alert(error.message);
        }).then(()=>{
          this.router.navigate(['/']);

        })
    );
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['home']);
      this.isLoggedIn$.next(false);
    });
  }

  getAllUsers(): Observable<any> {
    return this.dbRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }
  getAllTechUsers(): Observable<any> {
    return this.angularFireDatabase.list<Users>(this.dbUsersPath,ref => ref.orderByChild('roll').equalTo('Tech'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }


  getAllNgoUsers(): Observable<any> {
    return this.angularFireDatabase.list<Users>(this.dbUsersPath,ref => ref.orderByChild('roll').equalTo('Ngo'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

  update(key:string,data:Users){
    return this.dbRef.update(key,data)
       }

       getUserById(key:string){
        return this.angularFireDatabase.object(`${this.dbUsersPath}/${key}`).valueChanges()

       }
}
