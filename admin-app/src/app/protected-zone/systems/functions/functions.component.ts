import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api/treenode';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FunctionService, NotificationService, UtilitiesService } from '@app/shared/services';
import { MessageConstants } from '@app/shared/constants';
import { FunctionDetailComponent } from './function-detail/function-detail.component';
import { CommandsAssignComponent } from './commands-assign/commands-assign.component';
import { CommandAssign } from '@app/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public bsModalRef: BsModalRef;
  public blockedPanel = false;
  public blockedPanelCommand = false;
  public showCommandGrid = false;
  // -----------------Function-----------------
  public items: TreeNode[] = [];
  public selectedItems = [];
  public commands: any[] = [];
  public selectedCommandItems = [];

  constructor(
    private modalService: BsModalService,
    private functionsService: FunctionService,
    private notificationService: NotificationService,
    private utilitiesService: UtilitiesService) {
  }
  ngOnInit() {
    this.loadData();
  }

  togglePanel() {
    if (this.showCommandGrid) {
      if (this.selectedItems.length === 1) {
        this.loadDataCommand();
      }
    }

  }
  loadData(selectionId = null) {
    this.blockedPanel = true;
    this.subscription.add(this.functionsService.getAll()
      .subscribe((response: any) => {
        const functionTree = this.utilitiesService.UnflatteringForTree(response);
        console.log(functionTree);
        this.items = <TreeNode[]>functionTree;
        console.log(this.selectedItems);
        if (this.selectedItems.length === 0 && this.items.length > 0) {
          this.selectedItems.push(this.items[0]);
          this.loadDataCommand();
        }
        // Nếu có là sửa thì chọn selection theo Id
        if (selectionId != null && this.items.length > 0) {
          this.selectedItems = this.items.filter(x => x.data.id === selectionId);
        }

        setTimeout(() => { this.blockedPanel = false; }, 1000);
      }, error => {
        setTimeout(() => { this.blockedPanel = false; }, 1000);
      }));
  }

  showAddModal() {
    this.bsModalRef = this.modalService.show(FunctionDetailComponent,
      {
        class: 'modal-lg',
        backdrop: 'static'
      });

    this.bsModalRef.content.saved.subscribe(response => {
      this.bsModalRef.hide();
      this.loadData();
      this.selectedItems = [];
    });
  }

  showEditModal() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    const initialState = {
      entityId: this.selectedItems[0].data.id
    };
    this.bsModalRef = this.modalService.show(FunctionDetailComponent,
      {
        initialState: initialState,
        class: 'modal-lg',
        backdrop: 'static'
      });


    this.bsModalRef.content.saved.subscribe((response) => {
      this.bsModalRef.hide();
      this.loadData(response.id);
    });
  }
  loadDataCommand() {
    this.blockedPanelCommand = true;
    this.subscription.add(this.functionsService.getAllCommandsByFunctionId(this.selectedItems[0].id)
      .subscribe((response: any) => {

        this.commands = response;
        if (this.selectedCommandItems.length === 0 && this.commands.length > 0) {
          this.selectedCommandItems.push(this.commands[0]);
        }
        this.blockedPanelCommand = false;
      }, error => {
        this.blockedPanelCommand = false;
      }));
  }
  addCommandsToFunction() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    const initialState = {
      existingCommands: this.commands.map(x => x.Id),
      functionId: this.selectedItems[0].id
    };
    this.bsModalRef = this.modalService.show(CommandsAssignComponent,
      {
        initialState: initialState,
        class: 'modal-lg',
        backdrop: 'static'
      });
    this.subscription.add(this.bsModalRef.content.chosenEvent.subscribe((response: any[]) => {
      this.bsModalRef.hide();
      this.loadData();
      this.selectedItems = [];
    }));
  }

  removeCommands() {
    const selectCommandIds = [];
    this.selectedItems.forEach( element => {
      selectCommandIds.push(element.id);
    });
    this.notificationService.showConfirmation(MessageConstants.CONFIRM_DELETE_MSG,
      () => this.removeCommandsConfirm(selectCommandIds));
  }
  removeCommandsConfirm(ids: string[]) {
    this.blockedPanelCommand = true;
    const entity = new CommandAssign();
    entity.commandIds = ids;
    this.functionsService.deleteCommandsFromFunction(this.selectedItems[0].id, entity).subscribe(() => {
      this.loadDataCommand();
      this.selectedCommandItems = [];
      this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
      this.blockedPanelCommand = false;
    }, error => {
      this.blockedPanelCommand = false;
    });
  }

  deleteItems() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    const id = this.selectedItems[0].id;
    this.notificationService.showConfirmation(MessageConstants.CONFIRM_DELETE_MSG,
      () => this.deleteItemsConfirm(id));
  }
  deleteItemsConfirm(id: string) {
    this.blockedPanel = true;
    this.functionsService.delete(id).subscribe(() => {
      this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
      this.loadData();
      this.selectedItems = [];
      setTimeout(() => { this.blockedPanel = false; }, 1000);
    }, error => {
      setTimeout(() => { this.blockedPanel = false; }, 1000);
    });
  }
  nodeSelect(event: any) {
    this.selectedCommandItems = [];
    this.commands = [];
    if (this.selectedItems.length === 1 && this.showCommandGrid) {
      this.loadDataCommand();
    }
  }

  nodeUnSelect(event: any) {
    this.selectedCommandItems = [];
    this.commands = [];
    if (this.selectedItems.length === 1 && this.showCommandGrid) {
      this.loadDataCommand();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

