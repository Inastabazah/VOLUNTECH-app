import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent {


  formGroup!: FormGroup;

  key:string=''

  constructor(
    private formBuilder: FormBuilder,
    private _activityService: NgoActivityService,
    private activatedaRaoute:ActivatedRoute,
    private location: Location
  ) { this.formGroup = this.formBuilder.group({
    name: '',
    skills:'',
    purpose:'',
    startDate:'',
    endDate:'',
    volunteerwork:'',

  });}
  ngOnInit(): void {
    this.activatedaRaoute.queryParams.subscribe((result)=>{
      if(result['key']){
        this.key=result['key']

      this.getDateById()

      }

      });
  }


  getDateById(){
    this._activityService.getRequestById(this.key).subscribe((result:any)=>{
      this.formGroup = this.formBuilder.group({
        name: [ result['name']],
        skills:[result['skills']],
        purpose:[result['purpose']],
        startDate:[result['startDate']],
        endDate:[result['endDate']],
        volunteerwork:[result['volunteerwork']],
      })

    })
  }
  onUpdateClicked() {
    if (this.formGroup.invalid) {
      this.validatFormGroup();
    } else {
     this.UpdateActivity();
    }
  }







  UpdateActivity() {
    this._activityService
    .update(this.key,{
        name: this.formGroup.controls['name'].value,
        skills: this.formGroup.controls['skills'].value,
        purpose: this.formGroup.controls['purpose'].value,
        startDate: this.formGroup.controls['startDate'].value,
        endDate: this.formGroup.controls['endDate'].value,
        volunteerwork:
          this.formGroup.controls['volunteerwork'].value,

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
}
