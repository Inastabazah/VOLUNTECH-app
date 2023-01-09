import { Component, Injector, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserCredential } from '@firebase/auth-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(7)]],
      email: [
        '',
        [Validators.required, Validators.minLength(7), Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$'
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(10)]],
      skills: ['', [Validators.required, Validators.minLength(7)]],
      jobExperiences: ['', [Validators.required, Validators.minLength(7)]],
      courses: ['', [Validators.required, Validators.minLength(7)]],
      availableTime: ['', [Validators.required]],
    });
  }

  hide = true;

  get fullName() {
    return this.formGroup.controls['fullName'] as FormControl;
  }

  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }

  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }

  get phoneNumber() {
    return this.formGroup.controls['phoneNumber'] as FormControl;
  }

  get city() {
    return this.formGroup.controls['city'] as FormControl;
  }

  get skills() {
    return this.formGroup.controls['skills'] as FormControl;
  }

  get jobExperiences() {
    return this.formGroup.controls['jobExperiences'] as FormControl;
  }

  get courses() {
    return this.formGroup.controls['courses'] as FormControl;
  }
  get availableTime() {
    return this.formGroup.controls['availableTime'] as FormControl;
  }

  getEmailErrorMsg() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMsg() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return 'password not valid';
  }

  onsignUpClicked() {
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
      this._authService
        .signUp(this.email.value, this.password.value)
        .pipe(
          switchMap((user: any) => {
            return this._authService.creatTechuser(
              user.user.uid,
              this.fullName.value,
              this.email.value,
              this.phoneNumber.value,
              this.city.value,
              this.skills.value,
              this.jobExperiences.value,
              this.availableTime.value,
              this.courses.value,

            );
          })
        )
        .subscribe((result) => {
          this.router.navigate(['/layout']);
        });
    }
  }

  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
