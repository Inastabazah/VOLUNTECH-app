import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { UsersFilter } from 'src/app/core/intrerfaces/techFilter.interfsce';
import { Users } from 'src/app/core/intrerfaces/users.interface';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-previewlist',
  templateUrl: './previewlist.component.html',
  styleUrls: ['./previewlist.component.css'],
  providers:[DatePipe]
})
export class PreviewlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  activityInfo: any;
  type: string[] = ['All','NGO','Government','Religious'];
  name: string[] = ['All','Jordanian Red Crescent Society','Lawyers Without Borders','Jordan Better Work space Association'];
  requiredskills: string[] =['All','Punctuality','Organization','Communication','Teamwork','Relationship building','Confidence','Customer service','Sales','Problem solving','Training','IT tools','Leadership']
  defaultValue = 'All';
  filterDictionary = new Map<string, string>();
  usersFilters: UsersFilter[] = [];
  key: string = '';
  users: Users = {
    companyName: '',
    email: '',
    password: '',
    phoneNumber: 0,
    logo: '',
    type: '',
  };
  displayedColumns: string[] = ['name','description','requiredskills','startDate','endDate','numberOfTechnologists','attachments'];
  dataSource= new MatTableDataSource<Activity>([])



  constructor(private _activiySrevice:NgoActivityService, private router:Router,private datepipe: DatePipe
    ){
      this.dataSource.filterPredicate =
     (data, filter: string) => !filter || data.startDate.includes(filter);
    }




  ngOnInit(): void {
this.getAllData()


this.usersFilters.push({
  name:'name',
  options:this.name,
  defaultValue: this.defaultValue,
});

this.usersFilters.push({
  name:'requiredskills',
  options:this.requiredskills,
  defaultValue:this.defaultValue,
});

  }

  getAllData(){
    this._activiySrevice.getAll().subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = function (record, filter) {

        debugger;

        var map = new Map(JSON.parse(filter));
        let isMatch = false;
        for (let [key, value] of map) {
          isMatch = value === 'All' || record[key as keyof Activity] === value;
          if (!isMatch) return false;
        }
        return isMatch;
      };

      this.dataSource._updateChangeSubscription();
    });
  }



  onRequestClicked(){
    this.router.navigate(['//ngo/request'])
  }



  onEditClicked(activityInfo:Activity){
    this.router.navigate(['/ngo/update-activity'],{
      queryParams:{
        key:activityInfo.key,
      },
    })
  }
  applyEmpFilter(ob: MatSelectChange, usersfilter: UsersFilter) {
    this.filterDictionary.set(usersfilter.name, ob.value);

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );

    this.dataSource.filter = jsonString;

  }

 addEvent(filterValue:any,event:any) {
    debugger;

    if (event.value != undefined) {
      filterValue= this.datepipe.transform(filterValue, 'mm/dd/yyyy');
      console.log(filterValue);
    }
    this.dataSource.filter= filterValue.trim();
  }
}
