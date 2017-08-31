import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { UserSideBarComponent } from 'app/user/layout/side-bar/side-bar.component';

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
  toggleSideBarFlag = false;
  @ViewChild('sideBarModel') sideBarModel: UserSideBarComponent;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
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
        this.bookingName = params['bookingName'];
        if (!this.bookingName) {
          this._router.navigate(['/']);
        }

        this.bookingCustomer = params['bookingCustomer'];
        this.bookingDate = params['bookingDate'];
        this.hourOfDay = params['hourOfDay'];
      })
  }

}
