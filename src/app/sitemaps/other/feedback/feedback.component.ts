import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [accountModuleAnimation()]
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
