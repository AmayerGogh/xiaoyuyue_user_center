import { Component, OnInit, Injector } from '@angular/core';
import { ProfileServiceProxy, ChangePasswordInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Location } from '@angular/common';

declare var $: any;
@Component({
  selector: 'xiaoyuyue-passwd',
  templateUrl: './passwd.component.html',
  styleUrls: ['./passwd.component.scss']
})
export class PasswdComponent extends AppComponentBase implements OnInit  {
    input: ChangePasswordInput = new ChangePasswordInput();

  constructor(
      injector: Injector,
      private _location: Location,
      private _profileServiceProxy: ProfileServiceProxy
    ) {
        super(injector);
    }

  ngOnInit() {
      $.material.init();
  }

      ngAfterViewInit() {
        // TODO: 暂时处理
        $("#headerTitle").text("更换密码");
    }

  save(): void {
      this._profileServiceProxy
      .changePassword(this.input)
      .subscribe( () => {
        this._location.back();
        setTimeout( () => {
            this.notify.success("更改成功");
        }, 1000);
      });
  }

}
