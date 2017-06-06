// import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Injector, Input, Output, EventEmitter } from '@angular/core';
// import { PermissionServiceProxy, FlatPermissionWithLevelDto } from '@shared/service-proxies/service-proxies';
// import { AppComponentBase } from '@shared/common/app-component-base';

// import { Observable } from 'rxjs/Observable';

// // @Component({
// //     selector: 'permission-combo',
// //     template: 
// //     `<select #PermissionCombobox
// //         class="form-control"
// //         [(ngModel)]="selectedPermission"
// //         (ngModelChange)="selectedPermissionChange.emit($event)"
// //         [attr.data-live-search]="true">        
// //             <option value="">{{l('FilterByPermission')}}</option>
// //             <option *ngFor="let permission of permissions" [value]="permission.name">{{permission.displayName}}</option>
// //     </select>`
// // })
// @Component({
//     selector: 'permission-combo',
//     template: `
//     <kendo-combobox #PermissionCombobox class="permission-combobox"
//         [data]="data"
//         [textField]="'displayName'"
//         [valueField]="'name'"
//         [(ngModel)]="selectedPermission"
//         (selectionChange)="selectedPermissionChange.emit($event)"
//         [valuePrimitive]="true"
//         [placeholder]="'权限'"
//         [filterable]="true"
//         (filterChange)="handleFilter($event)">
//     </kendo-combobox>
//     `,
//     styles:[`
//         kendo-combobox.permission-combobox{
//             width: 100%;
//             height: 34px;
//             box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.18);
//         }
//     `
//     ]
// })
// export class PermissionComboComponent extends AppComponentBase implements OnInit {

//     @ViewChild('PermissionCombobox') permissionComboboxElement: ElementRef;

//     // permissions: FlatPermissionWithLevelDto[];
//     permissions: Array<{ displayName: string, name: string }> = [];
//     public data: Array<{ displayName: string, name: string }>;

//     @Input() selectedPermission: string;
//     @Output() selectedPermissionChange: EventEmitter<string> = new EventEmitter<string>();

//     handleFilter(value) {
//         this.data = this.permissions.filter((s) => s.displayName.toLowerCase().indexOf(value.toLowerCase()) !== -1);
//     }

//     constructor(
//         private _permissionService: PermissionServiceProxy,
//         injector: Injector) {
//         super(injector);
//     }

//     ngOnInit(): void {
//         var self = this;
//         this._permissionService.getAllPermissions().subscribe(result => {
//             $.each(result.items, (index, item) => {
//                 item.displayName = Array(item.level + 1).join('---') + ' ' + item.displayName;
//             });
//             this.permissions = result.items;
//             this.data = this.permissions;
//         });
//     }

//     // ngAfterViewInit(): void {
//     //     $(this.permissionComboboxElement.nativeElement).selectpicker({
//     //         iconBase: "famfamfam-flag",
//     //         tickIcon: "fa fa-check"
//     //     });
//     // }

//     // ngAfterViewChecked(): void{
//     //     $(this.permissionComboboxElement.nativeElement).selectpicker('refresh');
//     // }
// }


import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Injector, Input, Output, EventEmitter } from '@angular/core';
import { PermissionServiceProxy, FlatPermissionWithLevelDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DataLocalStorage } from "shared/services/data-local-storage.service";

@Component({
    selector: 'permission-combo',
    template:
    `<select #PermissionCombobox
        class="form-control"
        [(ngModel)]="selectedPermission"
        (ngModelChange)="selectedPermissionChange.emit($event)"
        [attr.data-live-search]="true">        
            <option value="">{{l('FilterByPermission')}}</option>
            <option *ngFor="let permission of _dataLocalStorage.permissions" [value]="permission.name">{{permission.displayName}}</option>
    </select>`,
})
export class PermissionComboComponent extends AppComponentBase implements OnInit, AfterViewInit {
    permissions: FlatPermissionWithLevelDto[];

    @ViewChild('PermissionCombobox') permissionComboboxElement: ElementRef;



    @Input() selectedPermission: string = undefined;
    @Output() selectedPermissionChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private _dataLocalStorage: DataLocalStorage,
        injector: Injector) {
        super(injector)
    }

    ngOnInit(): void {
        let self = this;
        this._dataLocalStorage
            .userDataLocalStorage()
            .then(result => {
                $.each(result, (index, item) => {
                    item.displayName = Array(item.level + 1).join('---') + ' ' + item.displayName;
                });

                setTimeout(() => {
                    $(self.permissionComboboxElement.nativeElement).selectpicker('refresh');
                }, 0);
            })
    }

    ngAfterViewInit(): void {
        $(this.permissionComboboxElement.nativeElement).selectpicker({
            iconBase: "famfamfam-flag",
            tickIcon: "fa fa-check"
        });
    }
}