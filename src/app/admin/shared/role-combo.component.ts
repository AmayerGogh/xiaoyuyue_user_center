import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Injector, Input, Output, EventEmitter } from '@angular/core';
import { RoleServiceProxy, RoleListDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DataLocalStorage } from "shared/services/data-local-storage.service";

@Component({
    selector: 'role-combo',
    template:
    `<select #RoleCombobox
        multiple
        class="form-control"
        title="{{l(emptyText)}}"
        [(ngModel)]="selectedRole"
        (ngModelChange)="selectedRoleChange.emit($event)"
        [attr.data-live-search]="true"
        jq-plugin="selectpicker">
            <option *ngFor="let role of _dataLocalStorage.roles" [value]="role.id">{{role.displayName}}</option>
    </select>`,
})
export class RoleComboComponent extends AppComponentBase implements OnInit, AfterViewInit {

    @ViewChild('RoleCombobox') roleComboboxElement: ElementRef;

    roles: RoleListDto[] = [];

    @Input() selectedRole: string = undefined;
    @Output() selectedRoleChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() emptyText: string = '';

    constructor(
        private _dataLocalStorage: DataLocalStorage,
        injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        let self = this;
        this._dataLocalStorage
        .rolesDataLocalStorage()
        .then( (response) => {
            setTimeout(() => {
                $(self.roleComboboxElement.nativeElement).selectpicker('refresh');
            }, 0);
        });
        // this._roleService.getRoles(undefined, undefined, undefined, undefined, undefined).subscribe(result => {
        //     this.roles = result.items;

        //     setTimeout(() => {
        //         $(self.roleComboboxElement.nativeElement).selectpicker('refresh');
        //     }, 0);
        // });
    }

    ngAfterViewInit(): void {
        $(this.roleComboboxElement.nativeElement).selectpicker({
            iconBase: "famfamfam-flag",
            tickIcon: "fa fa-check"
        });
    }
}


// import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, Injector, Input, Output, EventEmitter } from '@angular/core';
// import { RoleServiceProxy, RoleListDto } from '@shared/service-proxies/service-proxies';
// import { AppComponentBase } from '@shared/common/app-component-base';

// @Component({
//     selector: 'role-combo',
//     template:
//     `<select #roleMultiSelect
//         class="form-control"
//         multiple="multiple"
//         placeholder="test"
//         jq-plugin="multiselect">        
//             <option *ngFor="let role of roles" [value]="role.id">{{role.displayName}}</option>
//     </select>`,
// })
// export class RoleComboComponent extends AppComponentBase implements OnInit, AfterViewChecked, AfterViewInit {

//     @ViewChild('roleMultiSelect') roleMultiSelectElement: ElementRef;

//     roles: RoleListDto[] = [];

//     @Input() selectedRole: string = undefined;
//     @Output() selectedRoleChange: EventEmitter<string> = new EventEmitter<string>();

//     @Input() emptyText: string = '';

//     constructor(
//         private _roleService: RoleServiceProxy,
//         injector: Injector) {
//         super(injector);
//     }

//     ngOnInit(): void {
//         this._roleService.getRoles(undefined, undefined).subscribe(result => {
//             this.roles = result.items;

//             // 解决option无法用angular ngFor循环插入
//             var tmpl = "";
//             for (var i = 0, l = this.roles; i < l.length; i++) {
//                 var option =  `<option value=${this.roles[i].id}>${this.roles[i].displayName}</option>`;
//                 tmpl += option;
//             }

//             $(this.roleMultiSelectElement.nativeElement).append(tmpl);
//             $(this.roleMultiSelectElement.nativeElement).multiselect("rebuild");
//         });
//     }

//     ngAfterViewInit(): void {
//         $(this.roleMultiSelectElement.nativeElement).multiselect({
//             enableFiltering: true,
//             includeSelectAllOption: true,
//         });
//     }

//     ngAfterViewChecked(): void {
//         // $(this.roleMultiSelectElement.nativeElement).multiselect("refresh");
//     }
// }