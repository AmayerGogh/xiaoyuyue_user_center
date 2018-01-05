import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-how-to-manage',
  templateUrl: './how-to-manage.component.html',
  styleUrls: ['./how-to-manage.component.scss'],
  animations: [accountModuleAnimation()]

})
export class HowToManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
