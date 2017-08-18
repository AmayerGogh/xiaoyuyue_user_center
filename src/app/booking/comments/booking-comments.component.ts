import { Component, OnInit } from '@angular/core';

import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-booking-rating',
  templateUrl: './booking-comments.component.html',
  styleUrls: ['./booking-comments.component.scss'],
  animations: [appModuleAnimation()]
})
export class BookingCommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
