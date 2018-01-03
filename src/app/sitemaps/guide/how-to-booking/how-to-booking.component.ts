import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-how-to-booking',
  templateUrl: './how-to-booking.component.html',
  styleUrls: ['./how-to-booking.component.scss'],
  animations: [accountModuleAnimation()]
})
export class HowToBookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
