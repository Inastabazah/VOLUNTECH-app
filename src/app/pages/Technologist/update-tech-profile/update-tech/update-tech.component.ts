import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-tech',
  templateUrl: './update-tech.component.html',
  styleUrls: ['./update-tech.component.css']
})
export class UpdateTechComponent implements OnInit{
key:string=''
formGroup: FormGroup;

  constructor(private activatedaRaoute:ActivatedRoute, private _authService:AuthService, private formBuilder: FormBuilder,private location: Location){
    this.formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(7)]],
email:['', [Validators.required, Validators.minLength(7),Validators.email]],
password:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{10,}$')]],
phoneNumber:['', [Validators.required, Validators.minLength(10)]],
city:['', [Validators.required, Validators.minLength(10)]],
skills:['', [Validators.required, Validators.minLength(7)]],
jobExperiences:['', [Validators.required, Validators.minLength(7)]],
courses:['', [Validators.required, Validators.minLength(7)]],
availableTime:null
    });
  }

  ngOnInit(): void {
this.activatedaRaoute.queryParams.subscribe((result)=>{
if(result['key']){
  this.key=result['key']
this.getDateById()
}

});
  }
  getDateById(){
this._authService.getUserById(this.key).subscribe((result:any)=>{
  this.formGroup = this.formBuilder.group({
    fullName: [ result['fullName'], [Validators.required, Validators.minLength(7)]],
email:[result['email'], [Validators.required, Validators.minLength(7),Validators.email]],
password:[result['password'],[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{10,}$')]],
phoneNumber:[result['phoneNumber'], [Validators.required, Validators.minLength(10)]],
city:[result['city'], [Validators.required, Validators.minLength(10)]],
skills:[result['skills'], [Validators.required, Validators.minLength(7)]],
jobExperiences:[result['jobExperiences'], [Validators.required, Validators.minLength(7)]],
courses:[result['courses'], [Validators.required, Validators.minLength(7)]],
availableTime:[result['availableTime']]
  });




})
  }

  onUpdateClicked(){
    if (this.formGroup.invalid) {
      this.validatFormGroup();

      this.updateUser()
    }
  }


  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

 updateUser() {
    this._authService
      .update(this.key,{
        fullName: this.formGroup.controls['fullName'].value,
        email: this.formGroup.controls['email'].value,
        password: this.formGroup.controls['password'].value,
        phoneNumber: this.formGroup.controls['phoneNumber'].value,
        city: this.formGroup.controls['city'].value,

        skills: this.formGroup.controls['skills'].value,
        jobExperiences: this.formGroup.controls['jobExperiences'].value,
        courses: this.formGroup.controls['courses'].value,
        availableTime:this.formGroup.controls['availableTime'].value,
      })
      .then(() => {
        this.location.back()
      });
  }
}
