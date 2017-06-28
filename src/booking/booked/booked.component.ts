import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminSideBarComponent } from 'app/admin/layout/side-bar/side-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xiaoyuyue-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  hourOfDay: string;
  bookingDate: string;
  bookingCustomer: string;
  bookingName: string;
  toggleSideBarFlag: boolean = false;
  @ViewChild('sideBarModel') sideBarModel: AdminSideBarComponent;
  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
  }

  showSideBarHandler(flag) {
    this.toggleSideBarFlag = flag;
    this.toggleSideBarFlag && this.sideBarModel.showSideBar();
  }

  loadData() {
      this._route
      .queryParams
      .subscribe(params => {
          this.bookingName = params["bookingName"];
          this.bookingCustomer = params["bookingCustomer"];
          this.bookingDate = params["bookingDate"];
          this.hourOfDay = params["hourOfDay"];
      })
  }

}
