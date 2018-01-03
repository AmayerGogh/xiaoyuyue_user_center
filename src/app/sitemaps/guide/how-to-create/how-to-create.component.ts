import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-how-to-create',
  templateUrl: './how-to-create.component.html',
  styleUrls: ['./how-to-create.component.scss'],
  animations: [accountModuleAnimation()]
})
export class HowToCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
