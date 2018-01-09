import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {
  }

}
