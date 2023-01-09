import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'description', 'requiredskills', 'startDate','endDate','numberOfTechnologists','attachments'];
  dataSource= new MatTableDataSource<Activity>([])


  constructor(private _activiySrevice:NgoActivityService){}
  ngOnInit(): void {
this.getAllData()

  }

  getAllData(){
    this._activiySrevice.getAll().subscribe((result)=>{
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

}
