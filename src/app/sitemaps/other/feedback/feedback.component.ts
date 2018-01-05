import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { accountModuleAnimation } from 'shared/animations/routerTransition';
import { SitemapsService } from 'shared/services/sitemaps.service';

@Component({
  selector: 'xiaoyuyue-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [accountModuleAnimation()],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {
    resultData: any;

  constructor(
    private _sitemapsService: SitemapsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this._sitemapsService.getResultData('feedback', (result) => {
        this.resultData = result;
    })
}
}
