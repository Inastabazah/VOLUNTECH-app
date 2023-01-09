import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NavService } from 'src/app/core/services/nav/nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})


export class LayoutComponent implements OnInit {
  isLoggedIn$!:Observable<boolean>
  constructor(private _navService:NavService, private router:Router,private _authService:AuthService) {

  {}

  }ngOnInit()
   {
    this.isLoggedIn$=this._authService.isLoggedIn$
}
}

