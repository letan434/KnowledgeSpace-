import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FunctionService, NotificationService } from '@app/shared/services';
import { MessageConstants } from '@app/shared/constants';

@Component({
  selector: 'app-function-detail',
  templateUrl: './function-detail.component.html',
  styleUrls: ['./function-detail.component.scss']
})
export class FunctionDetailComponent implements OnInit {
  public dialogTitle: string;
  public entityForm: FormGroup;
  public entityId: string;
  public blockPanel = false;
  public btnDisabled = false;
  constructor(
    public bsModalRef: BsModalRef,
    private functionService: FunctionService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) { }
  saved: EventEmitter<any> = new EventEmitter();
  public rootFunctions: any[] = [];
  // validate
  noSpecial: RegExp = /^[^<>*!_~]+$/;
  validation_messages = {
    'name': [
      {type: 'required', message: 'ban phai nhap ten trang'},
      {type: 'minlength', message: 'ban phai nhap it nhat 3 ky tu'},
      {type: 'maxlength', message: 'ban khong duoc nhap qua 255 ky tu'}
    ],
    'id': [
      {type: 'required', message: 'ban phai nhap ma duy nhat'}
    ],
    'sortOrder': [
      {type: 'required', message: 'ban phai nhap thu tu'}
    ]
  };
  ngOnInit() {
    this.entityForm = this.fb.group({
      'id': new FormControl('', Validators.required),
      'parentId': new FormControl(),
      'name': new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(3)
      ])),
      'url': new FormControl(),
      'icon': new FormControl(),
      'sortOrder': new FormControl(1, Validators.required)
    });
    if (this.entityId) {
      this.dialogTitle = 'Cap nhat';
      this.loadParents(this.entityId);
    }
  }
  loadDetails(id) {
    this.btnDisabled = true;
    this.blockPanel = true;
    this.functionService.getDetail(id).subscribe((response: any) => {
      this.entityForm.setValue({
        id: response.id,
        parentId: response.parentId,
        name: response.name,
        url: response.url,
        icon: response.icon,
        sortOrder: response.sortOrder
      });
      setTimeout(() => {
        this.blockPanel = false;
        this.btnDisabled = false;
      }, 1000);

    }, error => {
      setTimeout(() => {
        this.blockPanel = false;
        this.btnDisabled = false;
      }, 1000);
    });
  }
  loadParents(id) {
    this.functionService.getAllByParentId(id).subscribe((response: any[]) => {
      this.rootFunctions = [];
      response.forEach(element => {
        this.rootFunctions.push({
          value: element.id,
          label: element.name
        });
      });
    });
  }
  saveChange() {
    this.btnDisabled = true;
    this.blockPanel = true;
    if (this.entityId) {
      this.functionService.update(this.entityId, this.entityForm.getRawValue())
        .subscribe(() => {
          this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
          this.saved.emit(this.entityForm.value);

          setTimeout(() => {
            this.btnDisabled = false;
            this.blockPanel = false;
          }, 1000);
        }, error => {
          setTimeout(() => {
            this.btnDisabled = false;
            this.blockPanel = false;
          }, 1000);
        });
    } else {
      this.functionService.add(this.entityForm.value)
        .subscribe(() => {

          this.notificationService.showSuccess(MessageConstants.CREATED_OK_MSG);
          this.saved.emit(this.entityForm.value);
          setTimeout(() => {
            this.btnDisabled = false;
            this.blockPanel = false;
          }, 1000);

        }, error => {
          setTimeout(() => {
            this.btnDisabled = false;
            this.blockPanel = false;
          }, 1000);
        });
    }
  }

}
