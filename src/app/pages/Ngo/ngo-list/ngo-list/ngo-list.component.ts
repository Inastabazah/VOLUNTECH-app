import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UsersFilter } from 'src/app/core/intrerfaces/techFilter.interfsce';
import { Users } from 'src/app/core/intrerfaces/users.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ngo-list',
  templateUrl: './ngo-list.component.html',
  styleUrls: ['./ngo-list.component.css'],
})
export class NgoListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Users>([]);
  key: string = '';
  users: Users = {
    companyName: '',
    email: '',
    password: '',
    phoneNumber: 0,
    logo: '',
    type: '',
  };
  loading = true;

  displayedColumns: string[] = [
    'companyName',
    'email',
    'phoneNumber',
    'companyWebsite',
    'type',
    'Logo',
  ];

  constructor(
    private _authservice: AuthService,
    private activatedaRaoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.dataSource.sort = this.sort;
    this.activatedaRaoute.queryParams.subscribe((result) => {
      if (result['key']) {
        this.key = result['key'];
        this.getDateById();
      }
    });

  }
  getDateById() {
    this._authservice.getUserById(this.key).subscribe((result: any) => {
      if (result) {
        this.users = result;
        this.loading = false;
      }
    });
  }

  getAllData() {
    this._authservice.getAllNgoUsers().subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;

      this.dataSource._updateChangeSubscription();
    });
  }



  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
if(this.dataSource.paginator){
  this.dataSource.paginator.firstPage()
}}
}
