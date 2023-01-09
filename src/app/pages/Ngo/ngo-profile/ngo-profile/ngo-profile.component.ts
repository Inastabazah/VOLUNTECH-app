import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/intrerfaces/users.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ngo-profile',
  templateUrl: './ngo-profile.component.html',
  styleUrls: ['./ngo-profile.component.css']
})
export class NgoProfileComponent  implements OnInit{
  userInfo: any;
  loading = true;

  constructor(private authService:AuthService,  private router:Router){

  }
  ngOnInit(): void {
    this.getuserInfo()

  }

  getuserInfo() {
    this.authService.userData.subscribe((user) => {
      if (user) {
        this.userInfo = user;

        this.loading = false;
        console.log(this.userInfo);
      }
    });
  }

  onEditClicked(userInfo:Users){
    this.router.navigate(['/ngo/update-ngo'],{
      queryParams:{
        key:userInfo.userId,
      },
    });
}

}
