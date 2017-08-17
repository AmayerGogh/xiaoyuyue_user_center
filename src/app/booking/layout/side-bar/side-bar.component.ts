import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xiaoyuyue-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class BookingSideBarComponent implements OnInit {

  href: string = document.location.href;
  bookingId: any = this.href.substr(this.href.lastIndexOf("/") + 1, this.href.length);

  constructor() { }

  ngOnInit() {
    this.bookingId = parseInt(this.bookingId);
    if (this.href.indexOf("?") >= 0) {
      this.bookingId += '';
      this.bookingId = this.bookingId.split("?")[0];
    }
  }

}
