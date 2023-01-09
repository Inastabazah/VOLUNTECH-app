import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 formGroup!:FormGroup

  constructor(private router:Router,private _authServise:AuthService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      email:['', [Validators.required, Validators.minLength(7),Validators.email]],
      password:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{10,}$')]],


      })
  }


 onLoginClicked(){
if(this.formGroup.invalid){
  this.validatFormGroup()
}else{
  this._authServise.login(this.email.value,this.password.value)
  this.router.navigate(['/tech'])
}

 }


 get email(){
  return this.formGroup.controls['email']as FormControl
}

get password(){
  return this.formGroup.controls['password']as FormControl
}

getEmailErrorMsg(){
  if (this.email.hasError('required')) {
    return 'You must enter an email';
  }

  return this.email.hasError('email') ? 'Not a valid email' : '';
}

getPasswordErrorMsg(){
  if (this.password.hasError('required')) {
    return 'You must enter a password';
  }

  return 'password not valid';
}
validatFormGroup(){
  Object.keys(this.formGroup.controls).forEach(filed=>{
    const control=this.formGroup.get(filed);
    control?.markAsTouched({onlySelf:true})
  })
}

}

