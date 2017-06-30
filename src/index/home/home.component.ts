import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  pagesArr: number[] = [];
  constructor() { }

  ngOnInit() {
  }

    ngAfterViewInit() {
    this.getPageOffsetTop();
  }

  getPageOffsetTop(): void {
    console.log($(".page"));
    let self = this;
    $(".page").each(function() {
      self.pagesArr.push($(this).offset().top);
      console.log(this);
    })
    console.log(this.pagesArr);
  }
}
