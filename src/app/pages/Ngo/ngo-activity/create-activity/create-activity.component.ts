import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';
import { UploadService } from 'src/app/core/services/upload-attachment/upload.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
})
export class CreateActivityComponent implements OnInit {
  formGroup!: FormGroup;
  imgSrc:any
  constructor(
    private formBuilder: FormBuilder,
    private _activityService: NgoActivityService,
    private _attchmentUploadService: UploadService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      requiredskills: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      numberOfTechnologists: [null, Validators.required],
      attachments: null,
    });
  }
  onAddClicked() {
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
      if (this.formGroup.controls['attachments'].value) {
        this.upload();
      } else {
        this.createActivity();
      }
    }
  }

  upload() {
    this._attchmentUploadService
      .Upload(this.formGroup.controls['attachments'].value)
      .subscribe((file) => {
        if (file?.metadata) {
          this.getFileUrl();
        }
      });
  }



  getFileUrl() {
    this._attchmentUploadService.getDownLoadURL().subscribe((url) => {
      this.formGroup.controls['attachments'].setValue(url);
      this.createActivity();
    });
  }

  onFileInputChange($event: any) {
    this.formGroup.controls['attachments'].setValue($event.target.files[0]);

    console.log($event);
    const reader= new FileReader()
    reader.onload =(e)=> (this.imgSrc =reader.result)
  reader.readAsDataURL(this.formGroup.controls['attachments'].value)
  }

  createActivity() {
    this._activityService
      .create({
        name: this.formGroup.controls['name'].value,
        description: this.formGroup.controls['description'].value,
        requiredskills: this.formGroup.controls['requiredskills'].value,
        startDate: this.formGroup.controls['startDate'].value,
        endDate: this.formGroup.controls['endDate'].value,
        numberOfTechnologists:
          this.formGroup.controls['numberOfTechnologists'].value,
        attachments: this.formGroup.controls['attachments'].value,
      })
      .then(() => {
        this.location.back()
      });
  }

  validatFormGroup() {
    Object.keys(this.formGroup.controls).forEach((filed) => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  get name() {
    return this.formGroup.controls['name'] as FormControl;
  }
}
