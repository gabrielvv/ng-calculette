import { Component, OnInit } from '@angular/core';
import { OperationsService, Operation, OpType } from './services';
import { StepState } from './components/steps/steps.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'calculette',
  templateUrl: './calculette.component.html',
  styleUrls: ['./calculette.component.css']
})
export class CalculetteComponent implements OnInit {

  stepsNb : number = 20;
  steps : Array<StepState>;

  private ok : number = 0;
  private ko : number = 0;

  wrongValue : number;
  goodValue : number;
  resetTrigger : number = 0;

  mistakes : number = 0;

  currentOp : Operation;
  subscription : any;

  disabledKeys : Array<number> = [];

  constructor(private operationsService: OperationsService) {
    this.subscription = operationsService.getOp().subscribe(op=>{
      this.currentOp=op
      this.reset();
    });
  }

  ngOnInit() {
    this.steps = Array(this.stepsNb).fill(StepState.UNDEFINED);
  }

  ngOnDestroy(){
    this.subscription && this.subscription.unsubscribe();
  }

  reset(){
    this.resetTrigger++;
  }

  attempt(value:number){
    const ok = this.operationsService.isOk(value);
    ok ? this.ok++ : this.ko++;

    if(ok){
      this.operationsService.setOp(this.currentOp.type);
      this.reset();
      this.mistakes = 0;
      this.disabledKeys = [];
      this.goodValue = value;
    }else{
      if(++this.mistakes == 2){
        this.helpme();
      }
      this.wrongValue = value;
    }

    const i = this.steps.findIndex(s=>s===StepState.UNDEFINED);
    this.steps[i] = ok ? StepState.GOOD : StepState.WRONG;
  }

  helpme() {
    const disabledKeys = [];
    if(!this.currentOp) return;

    console.log("helpme", this.currentOp.type)
  	for (var i = 0;i<100;i++) {
  		switch (this.currentOp.type) {
  			case OpType.MULTIPLICATION :
  			if (i % this.currentOp.digit1 != 0) {
  				disabledKeys.push(i);
  			}
  			break;

  			case OpType.ADDITION :
  			case OpType.SOUSTRACTION :
  			if (i != this.currentOp.result && Math.random() > 0.7) {
  				disabledKeys.push(i);
  			}
  			default :
  		}
  	}
    this.disabledKeys = disabledKeys;
  }

}
