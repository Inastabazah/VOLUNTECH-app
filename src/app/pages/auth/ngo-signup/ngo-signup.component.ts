import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { Observable } from '@firebase/util';
import { finalize, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.css'],
})
export class NgoSignupComponent implements OnInit {
  logopath = '';

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  downloadUrl: string='';

  constructor(
    private router: Router,
    private _authService: AuthService,
    private formBuilder: FormBuilder,
    private af: AngularFireStorage
  ) {}

  formGroup!: FormGroup;
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(7)]],
      email: [
        '',
        [Validators.required, Validators.minLength(7), Validators.email],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$'
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      companyWebsite: ['', [Validators.required, Validators.minLength(7)]],
      logo: [null, Validators.required],
      type: [null, Validators.required],
    });
  }
  setLogoValue($event:any){
    this.logo.setValue($event.target);
    const reader= new FileReader()

  }
  onsignUpClicked() {
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
      if (this.logo.value) {
        this.upload().pipe(
          finalize(()=>{
            this.signup();
          })
        ).subscribe();
      } else {
        this.signup();
      }
    }
  }

  signup() {
    this._authService
      .signUp(this.email.value, this.password.value)
      .pipe(
        switchMap((user: any) => {
          return this._authService.creatNgouser(
            user.user.uid,
            this.companyName.value,
            this.email.value,
            this.phoneNumber.value,
            this.companyWebsite.value,
            this.type.value,
            this.downloadUrl,

          );
        })
      )
      .subscribe((result) => { this.router.navigate(['/layout']);});

  }

  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  hide = true;

  get companyName() {
    return this.formGroup.controls['companyName'] as FormControl;
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

  get companyWebsite() {
    return this.formGroup.controls['companyWebsite'] as FormControl;
  }

  get logo() {
    return this.formGroup.controls['logo'] as FormControl;
  }
  get type() {
    return this.formGroup.controls['type'] as FormControl;
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

    return 'password not valid ';
  }

  upload() {
    const filePath = `/files/${this.logo.value.files[0]}/${this.logo.value.files[0].name}`;
    const storageRef = this.af.ref(filePath);
    const uploadTask = this.af.upload(filePath, this.logo.value.files[0]);

 return   uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.downloadUrl = downloadURL;
          });
        })
      )
      ;
  }
}
