import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-custom-service',
  templateUrl: './custom-service.component.html',
  styleUrls: ['./custom-service.component.scss'],
  animations: [accountModuleAnimation()]
})
export class CustomServiceComponent implements OnInit {
    resultData: any;

  constructor() { }

  ngOnInit() {
      this.loadData();
  }

  private loadData(): void {
    let cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
    if (!cookieLangValue) {
        cookieLangValue = 'zh-CN';
    }
    const url = `/assets/contacthelp.${cookieLangValue}.json`;
    $.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        success: result => {
            result = JSON.parse(result);
            this.resultData = result.contacthelp;
        }
    })
}

}
