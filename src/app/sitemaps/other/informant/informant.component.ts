import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-informant',
  templateUrl: './informant.component.html',
  styleUrls: ['./informant.component.scss'],
  animations: [accountModuleAnimation()]
})
export class InformantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
