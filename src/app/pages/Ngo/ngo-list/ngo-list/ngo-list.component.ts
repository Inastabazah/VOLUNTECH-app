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
  type: string[] = ['All', 'NGO', 'Government', 'Religious'];
  companyName: string[] = ['All', 'Company', 'Organisation', 'Association'];
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
  defaultValue = 'All';
  filterDictionary = new Map<string, string>();
  usersFilters: UsersFilter[] = [];
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
    this.usersFilters.push({
      name: 'type',
      options: this.type,
      defaultValue: this.defaultValue,
    });
    this.usersFilters.push({
      name: 'companyName',
      options: this.companyName,
      defaultValue: this.defaultValue,
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
      this.dataSource.filterPredicate = function (record, filter) {
        debugger;
        var map = new Map(JSON.parse(filter));
        let isMatch = false;
        for (let [key, value] of map) {
          isMatch = value === 'All' || record[key as keyof Users] === value;
          if (!isMatch) return false;
        }
        return isMatch;
      };
      this.dataSource._updateChangeSubscription();
    });
  }

  applyEmpFilter(ob: MatSelectChange, usersfilter: UsersFilter) {
    this.filterDictionary.set(usersfilter.name, ob.value);

    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );

    this.dataSource.filter = jsonString;
    //console.log(this.filterValues);
  }

  //applyFilter($event: Event) {
   // const filterValue = ($event.target as HTMLInputElement).value;
  //  this.dataSource.filter = filterValue.trim().toLowerCase();
//if(this.dataSource.paginator){
 // this.dataSource.paginator.firstPage()
//}}
}
