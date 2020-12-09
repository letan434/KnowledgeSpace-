import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FunctionService } from '@app/shared/services';
import { CommandService } from '@app/shared/services/command.service';
import { CommandAssign } from '@app/shared/models';

@Component({
  selector: 'app-commands-assign',
  templateUrl: './commands-assign.component.html',
  styleUrls: ['./commands-assign.component.scss']
})
export class CommandsAssignComponent implements OnInit {
  public dialogTitle: string;
  public blockedPanel = false;
  public items: any[];
  public selectItems: any[] = [];
  public functionId: string;
  public existingCommands: any[] = [];
  public addToAllFunctions = false;
  private chosenEvent: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef,
    private functionService: FunctionService,
    private commandService: CommandService
  ) { }

  ngOnInit() {
    this.loadAllCommands();
  }
  loadAllCommands() {
    this.blockedPanel = true;
    this.commandService.getAll().subscribe((response: any[]) => {
      this.items = [];
      const existingCommands = this.existingCommands;
      const notExistingCommands = response.filter(function (item) {
        return existingCommands.indexOf(item.Id) === -1;
      });
      this.items = notExistingCommands;
      if (this.selectItems.length === 0 && this.items.length > 0 ) {
        this.selectItems.push(this.items[0]);
      }
      setTimeout(() => { this.blockedPanel = false; }, 1000);
    });

  }
  chooseCommand() {
    this.blockedPanel = true;
    const selectItemIds = [];
    this.selectItems.forEach(element => {
      selectItemIds.push(element.id);
    });
    const entity = new CommandAssign();
    entity.addToAllFunctions = this.addToAllFunctions;
    entity.commandIds = selectItemIds;
    this.functionService.addCommandsToFunction(this.functionId, entity).subscribe(() => {
      this.chosenEvent.emit(this.selectItems);
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    });
  }
}
