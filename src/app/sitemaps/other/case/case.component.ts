import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
  animations: [accountModuleAnimation()]
})
export class CaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
