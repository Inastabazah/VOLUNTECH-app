import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';


@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.css']
})
export class ApproveRequestComponent implements OnInit{
  activityInfo: any;

  constructor(private _activiySrevice:NgoActivityService, private router:Router
    ){}

  displayedColumns: string[] = ['name', 'skills', 'purpose', 'startDate','endDate','volunteerwork','actions'];
  dataSource= new MatTableDataSource<Activity>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
this.getAllData()

  }

  getAllData(){
    this._activiySrevice.getAllRequestData().subscribe((result)=>{
      console.log(result)
      this.dataSource=new MatTableDataSource(result)
    this.dataSource.paginator = this.paginator;
  this.dataSource._updateChangeSubscription()})
  }


  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
if(this.dataSource.paginator){
  this.dataSource.paginator.firstPage()
}

  }








  onApproveClicked(row:Activity){
this._activiySrevice.creatWhenApproved(row).then(()=>{
  this._activiySrevice.deleteRequest(row.key)
})
window.alert('approved successfuley')
  }
  onDeleteClicked(row:Activity){
    this._activiySrevice.deleteRequest(row.key).then(()=>{})
  }
}
