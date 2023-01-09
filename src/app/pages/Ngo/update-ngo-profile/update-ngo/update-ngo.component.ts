import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Location } from '@angular/common';
import { ImageService } from 'src/app/core/services/image/image.service';

@Component({
  selector: 'app-update-ngo',
  templateUrl: './update-ngo.component.html',
  styleUrls: ['./update-ngo.component.css']
})
export class UpdateNgoComponent implements OnInit {
  formGroup!: FormGroup;
  key:string=''
  imgSrc:any
  constructor(private location: Location,private formBuilder: FormBuilder,private activatedaRaoute:ActivatedRoute, private _authService:AuthService,  private _logoUploadService: ImageService){
    this.formGroup = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(7)]],
      email: [
        '',
        [Validators.required, Validators.minLength(7), Validators.email],
      ],
      password: [
        null,
        [
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$'
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      companyWebsite: ['', [Validators.required, Validators.minLength(7)]],
      type:null,
      logo: null,
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


  onUpdateClicked(){
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this. updateUser();
      }
    }
  }
  onFileInputChange($event: any) {
    this.formGroup.controls['logo'].setValue($event.target.files[0]);
    const reader= new FileReader()
    reader.onload =(e)=> (this.imgSrc =reader.result)
    reader.readAsDataURL(this.formGroup.controls['logo'].value)
    console.log($event);
  }


  upload() {
    this._logoUploadService
      .Upload(this.formGroup.controls['logo'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getFileUrl();
        }
      });
  }



  getFileUrl() {
    this._logoUploadService.getDownLoadURL().subscribe((url) => {
      this.formGroup.controls['logo'].setValue(url);
      this. updateUser();
    });
  }
  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }


  getDateById(){
    this._authService.getUserById(this.key).subscribe((result:any)=>{
      this.formGroup = this.formBuilder.group({
        companyName: [ result['companyName'], [Validators.required, Validators.minLength(7)]],
    email:[result['email'], [Validators.required, Validators.minLength(7),Validators.email]],
    password:[result['password'],[Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{10,}$')]],
    phoneNumber:[result['phoneNumber'], [Validators.required, Validators.minLength(10)]],
    companyWebsite:[result['companyWebsite'], [Validators.required, Validators.minLength(7)]],
    type:[result['type']],
    logo:[result['logo'], Validators.required],
      })
      this.imgSrc=result['logo']

    })
  }

  updateUser() {
    this._authService
      .update(this.key,{
        companyName: this.formGroup.controls['companyName'].value,
        email: this.formGroup.controls['email'].value,
        password: this.formGroup.controls['password'].value,
        phoneNumber: this.formGroup.controls['phoneNumber'].value,
        companyWebsite: this.formGroup.controls['companyWebsite'].value,
        type: this.formGroup.controls['type'].value,
        logo: this.formGroup.controls['logo'].value,

      })
      .then(() => {
        this.location.back()
      });
  }
}
