import { Component, OnInit, OnDestroy } from '@angular/core';
import { OperationsService, Operation } from '../../services';
import { Observable } from "rxjs";

@Component({
  selector: 'calc-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit, OnDestroy {

  op$ : Observable<Operation>|null = null;
  subscription : any;

  constructor(private operationsService: OperationsService) {
    this.op$ = this.operationsService.getOp();
    this.op$.subscribe(op=>{
      // TODO
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    //this.op && this.op.unsubscribe();
  }

}
