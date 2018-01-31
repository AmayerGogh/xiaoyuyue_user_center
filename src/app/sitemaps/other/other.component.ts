import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent extends AppComponentBase implements OnInit {

  constructor(
      private injector: Injector
  ) { 
      super(injector)
  }

  ngOnInit() {
  }

}
