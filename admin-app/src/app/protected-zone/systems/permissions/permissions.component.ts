import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PermissionsService } from '@app/shared/services/permissions.service';
import { NotificationService, RolesService, UtilitiesService } from '@app/shared/services';
import { CommandService } from '@app/shared/services/command.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  private subscription = new Subscription();
  public bsModalRef: BsModalRef;
  public blockedPanel = false;
  public functions: any[];
  public flattenFunctions: any[] = [];
  public selectedRole: any = {
    id: null
  };
  public roles: any[] = [];
  public commands: any[] = [];
  public selectedViews: string[] = [];
  public selectedCreates: string[] = [];
  public selectedUpdates: string[] = [];
  public selectedDeletes: string[] = [];
  public selectedApproves: string[] = [];

  public isSelectedAllViews = false;
  public isSelectedAllCreates = false;
  public isSelectedAllUpdates = false;
  public isSelectedAllDeletes = false;
  public isSelectedAllApproves = false;
  constructor(
  private permissionsService: PermissionsService,
  private roleService: RolesService,
  private commandService: CommandService,
  private _utilitiesservice: UtilitiesService,
  private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadAllRole();
  }
  loadAllRole() {
    this.blockedPanel = true;
    this.subscription.add(this.roleService.getAll().subscribe((response: any) => {
      this.roles = response;
      setTimeout(() => {this.blockedPanel = false; }, 1000);
    }));
  }
}
