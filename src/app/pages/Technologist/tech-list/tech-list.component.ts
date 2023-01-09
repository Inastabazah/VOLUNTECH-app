import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash'
import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Users} from 'src/app/core/intrerfaces/users.interface';
import { UsersFilter } from 'src/app/core/intrerfaces/techFilter.interfsce';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.css']
})
export class TechListComponent implements OnInit{

  dataSource= new MatTableDataSource<Users>([])

  displayedColumns :string[]=['fullName','email','phoneNumber','city','skills','jobExperiences','courses','availableTime']
  city:string[]=['All','Amman','Zarqa','Irbid','Aqaba','Mafraq','Madaba','As-Salt','Jerash','Maan','Karak','Tafilah','Fuheis','Ajloun']
skills:string[]=['All','Punctuality','Organization','Communication','Teamwork','Relationship building','Confidence','Customer service','Sales','Problem solving','Training','IT tools','Leadership']
defaultValue = "All";
filterDictionary= new Map<string,string>()
usersFilters: UsersFilter[]=[];
dataSourceFilters = new MatTableDataSource<Users>([])


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _authservice:AuthService){

  }

  ngOnInit() :void{

    this.getAllData()
    this.dataSource.sort = this.sort;

    this.usersFilters.push({name:'City',options:this.city,defaultValue:this.defaultValue});
    this.usersFilters.push({name:'Skills',options:this.skills,defaultValue:this.defaultValue});


  }

getAllData(){
 this._authservice.getAllTechUsers().subscribe((result)=>{
 console.log(result)
  this.dataSource= new MatTableDataSource(result);
  this.dataSource.paginator=this.paginator;
  this.dataSource.filterPredicate = function (record,filter) {
    debugger;
    var map = new Map(JSON.parse(filter));
    let isMatch = false;
    for(let [key,value] of map){
      isMatch = (value === "All") || (record[key as keyof Users] === value);
      if(!isMatch) return false;
    }
    return isMatch;
  }
  this.dataSource._updateChangeSubscription()

})
  }



  applyUserFilter(ob:MatSelectChange,usersfilter:UsersFilter) {

    this.filterDictionary.set(usersfilter.name,ob.value);


    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));

    this.dataSource.filter = jsonString;
    console.log(this.dataSource.filter);
  }
  applyFilter($event:any){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }



}
