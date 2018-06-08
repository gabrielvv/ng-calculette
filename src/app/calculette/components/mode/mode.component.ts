import { Component, OnInit } from '@angular/core';
import { OperationsService, Operation, Mode } from '../../services';
import { Observable } from "rxjs";

@Component({
  selector: 'calc-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {

  ops$ : Observable<Mode[]> = new Observable<Mode[]>();

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.ops$ = this.operationsService.modes;
  }

  select(op : Mode){
    this.operationsService.setMode(op);
  }

}
