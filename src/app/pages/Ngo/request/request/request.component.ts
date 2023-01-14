import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Users } from 'src/app/core/intrerfaces/users.interface';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  formGroup!: FormGroup;
  volunteerwork!: string;

  userInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private _activityService: NgoActivityService,
    private _authService: AuthService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this._authService.userData.subscribe((result) => {
      if(result){
        this.userInfo=result;
      }
    });
    this.formGroup = this.formBuilder.group({
      name: [''],
      skills: [''],
      purpose: [''],
      startDate: [''],
      endDate: [''],
      volunteerwork: [''],


    });
  }
  onrequestClicked() {
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
      this.getuserInfo()
      this.requestActivity();

    }
  }


  getuserInfo() {
    this._authService.userData.subscribe((user) => {
      if (user) {
        this.userInfo = user;
        console.log( this.userInfo)


      }
    });
  }

  requestActivity() {
    this._activityService
      .createRequest({
        name: this.formGroup.controls['name'].value,
        skills: this.formGroup.controls['skills'].value,
        purpose: this.formGroup.controls['purpose'].value,
        startDate: this.formGroup.controls['startDate'].value,
        endDate: this.formGroup.controls['endDate'].value,
        volunteerwork: this.formGroup.controls['volunteerwork'].value,
        userId: this.userInfo.userId,
      })
      .then(() => {
        this.location.back();
      });
  }

  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
{
}
