import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';

@Component({
  selector: 'xiaoyuyue-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  animations: [accountModuleAnimation()]

})
export class NoticeComponent implements OnInit {
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
    const url = `/assets/protocol.${cookieLangValue}.json`;
    $.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        success: result => {
            result = JSON.parse(result);
            this.resultData = result.protocol;
        }
    })
}

}
