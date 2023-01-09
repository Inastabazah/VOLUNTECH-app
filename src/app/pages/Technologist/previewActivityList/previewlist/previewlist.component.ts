import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';

@Component({
  selector: 'app-previewlist',
  templateUrl: './previewlist.component.html',
  styleUrls: ['./previewlist.component.css']
})
export class PreviewlistComponent implements OnInit {
  activityInfo: any;

  constructor(private _activiySrevice:NgoActivityService, private router:Router
    ){}

  displayedColumns: string[] = ['name', 'description', 'requiredskills', 'startDate','endDate','numberOfTechnologists','attachments'];
  dataSource= new MatTableDataSource<Activity>([])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

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

  onRequestClicked(){
    this.router.navigate(['/ngo/request'])
  }



  onEditClicked(activityInfo:Activity){
    this.router.navigate(['/ngo/update-activity'],{
      queryParams:{
        key:activityInfo.key,
      },
    })
  }


}
