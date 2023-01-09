import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavMenuDto } from '../../../dtos/nav-menue';
import { AuthService } from '../../../services/auth/auth.service';
import { NavService } from '../../../services/nav/nav.service';
import{BreakpointObserver, BreakpointState}from '@angular/cdk/layout'
import { delay } from 'rxjs';
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  navServiseList:NavMenuDto =new NavMenuDto('',[])
  @ViewChild(MatSidenav)
  sideNav!: MatSidenav;
  userInfo:any ;
loading=true;

  constructor(private _navService:NavService, private router:Router,private _authSrervice:AuthService,private breakpoint:BreakpointObserver,) {
    this.navServiseList=this._navService.getNavMenu()

  }





  ngOnInit(): void {
   this.getuserInfo()
}

getuserInfo(){
  this._authSrervice.userData.subscribe((user)=>{
    this.userInfo=user;
    console.log(this.userInfo);
    if(this.userInfo.roll){
      this.loading=false;
    }

  })
}

ngAfterViewInit(): void {
  this .breakpoint.observe(['(max-width:800px)']).pipe(delay(1)).subscribe((state:BreakpointState)=>{
   if(state.matches){
     this.sideNav.mode='over';
     this.sideNav.close()
   }else{
     this.sideNav.mode='side';
     this.sideNav.open()
   }
  })
 }


  onItemClicked(){
    if(this.sideNav.mode==='over'){
      this.sideNav.close()
    }
  }

  onLoggedOutClicked(){
this._authSrervice.logout()
  }



}




