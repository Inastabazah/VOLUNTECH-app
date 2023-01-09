import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/core/intrerfaces/users.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-tech-profile',
  templateUrl: './tech-profile.component.html',
  styleUrls: ['./tech-profile.component.css'],
})
export class TechProfileComponent implements OnInit {
  userInfo: any;
  loading = true;
  constructor(
    private _authSrervice: AuthService,

    private router:Router
  ) {}

  ngOnInit(): void {
    this.getuserInfo();
  }

  getuserInfo() {
    this._authSrervice.userData.subscribe((user) => {
      if (user) {
        this.userInfo = user;

        this.loading = false;
        console.log(this.userInfo);
      }
    });
  }


 onEditClicked(userInfo:Users){
    this.router.navigate(['/tech/update-tech'],{
      queryParams:{
        key:userInfo.userId,
      },
    });
}
}
