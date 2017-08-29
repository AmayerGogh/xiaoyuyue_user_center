import { ChangePasswordInput, ProfileServiceProxy } from '@shared/service-proxies/service-proxies';
import { Component, Injector, OnInit } from '@angular/core';

import { AppComponentBase } from '@shared/common/app-component-base';
import { Location } from '@angular/common';
import { appModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-passwd',
  templateUrl: './passwd.component.html',
  styleUrls: ['./passwd.component.scss'],
  animations: [appModuleAnimation()]
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
