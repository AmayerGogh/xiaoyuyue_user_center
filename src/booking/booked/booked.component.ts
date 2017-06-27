import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminSideBarComponent } from 'app/admin/layout/side-bar/side-bar.component';

@Component({
  selector: 'xiaoyuyue-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
toggleSideBarFlag: boolean = false;
    @ViewChild('sideBarModel') sideBarModel: AdminSideBarComponent;
  constructor() { }

  ngOnInit() {
  }

      showSideBarHandler(flag) {
        this.toggleSideBarFlag = flag;
        this.toggleSideBarFlag && this.sideBarModel.showSideBar();
    }

}
