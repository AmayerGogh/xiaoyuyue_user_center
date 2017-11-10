import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from 'shared/common/app-component-base';

@Component({
  selector: 'xiaoyuyue-qrcode-model',
  templateUrl: './qrcode-model.component.html',
  styleUrls: ['./qrcode-model.component.scss']
})
export class QrcodeModelComponent extends AppComponentBase implements OnInit {
    isShowFlag: boolean = false;
    @Input() qrcodeUrl: string;

  constructor(
      private injector: Injector
  ) {
      super(injector);
 }

  ngOnInit() {
  }

  public show(): void {
    this.isShowFlag = true;
  }

  public hide(): void {
    this.isShowFlag = false;
    
  }
}
