import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from "shared/common/app-component-base";
import { UploadPictureModelComponent } from "app/admin/create-or-edit-booking/picture-manage/upload-picture-model/upload-picture-model.component";

@Component({
  selector: 'app-picture-manage',
  templateUrl: './picture-manage.component.html',
  styleUrls: ['./picture-manage.component.scss']
})
export class PictureManageComponent extends AppComponentBase implements OnInit {
  allPictureUrl: string[];

  @ViewChild('uploadPictureModel') uploadPictureModel: UploadPictureModelComponent;


  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  createUser(): void {
    this.uploadPictureModel.show();
  }

  getAllPictureUrl(allPictureUrl: string[]) {
    this.allPictureUrl = allPictureUrl;
  }

}
