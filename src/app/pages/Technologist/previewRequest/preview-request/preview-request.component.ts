import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { result } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Activity } from 'src/app/core/intrerfaces/activity.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NgoActivityService } from 'src/app/core/services/ngo-activity/ngo-activity.service';

@Component({
  selector: 'app-preview-request',
  templateUrl: './preview-request.component.html',
  styleUrls: ['./preview-request.component.css'],
})
export class PreviewRequestComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  requestInfo: any = '';
  userInfo:any
  userId: any = '';
  loading = true;
  displayedColumns: string[] = [
    'name',
    'name',
    'purpose',
    'startDate',
    'endDate',
    'volunteerwork',
  ];
  dataSource = new MatTableDataSource<Activity>([]);

  constructor(
    private _activityService: NgoActivityService,
    private router: Router,
    private _authService: AuthService,
    private activatedaRaoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
  //  this.getAllData();
this. getuserInfo()
  }



  getuserInfo() {
    this._authService.userData.subscribe((user) => {
      if (user.userId) {
        this.userInfo = user;
        this.getRequestInfo(user.userId);


      }
    });
  }
 // getAllData() {
   // this._activityService.getUserRequest().subscribe((result) => {
     // console.log(result);
     // this.dataSource = new MatTableDataSource(result);

    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource._updateChangeSubscription();

      //if (this.requestInfo) {
        //this.loading = false;
      //}
    //});
  //}

  getRequestInfo(userId:any) {
    this._activityService.getUserRequest(userId).subscribe((request) => {
      if (request) {
        this.requestInfo = request;
        console.log(this.requestInfo);
        this.userId = request.userId;

        this.loading = false;
      }
    });
  }

  onEditClicked(requestInfo: Activity) {
    this.router.navigate(['/tech/update-request'], {
      queryParams: {
        key: requestInfo.key,
      },
    });
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
