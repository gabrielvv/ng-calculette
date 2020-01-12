import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum OpType {
  MULTIPLICATION = 'multiplication',
  ADDITION = 'addition',
  SOUSTRACTION = 'soustraction',
  MIX = 'mix'
}

export class Mode {
  constructor(type: OpType, label: string){
    this.label = label;
    this.type = type;
  }
  type: OpType;
  label: string;
  selected: boolean = false;
}


export class Operation {
  digit1: number;
  digit2: number;
  opChar: string;
  result: number;
  type: OpType;
  get text(){
    return `${this.digit1} ${this.opChar} ${this.digit2}`;
  }
}

export class Level {
  constructor(value: number, label: string, selected : boolean = false){
    this.label = label;
    this.value = value;
    this.selected = selected;
  }
  value: number;
  label: string;
  selected: boolean;
}

@Injectable()
export class OperationsService {

  currentStep : number = 0;

  levels : BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([
    new Level(1, "1", true),
    new Level(2, "2"),
    new Level(3, "3"),
  ]);
  level : number;

  currentOp : BehaviorSubject<Operation> = new BehaviorSubject<Operation>(null);

  modes : BehaviorSubject<Mode[]> = new BehaviorSubject<Mode[]>([
      new Mode(OpType.ADDITION, "+"),
      new Mode(OpType.MULTIPLICATION, "x"),
      new Mode(OpType.SOUSTRACTION, "-"),
      new Mode(OpType.MIX, "?"),
  ]);
  selectedMode : Mode;

  coefs = [0.25, 0.6, 1];

  constructor() {

    this.randomMode();
    this.modes.subscribe(modes=>{
      this.selectedMode = modes.find(m=>m.selected);
      this.setOp(this.selectedMode.type);
    });

    this.levels.subscribe(levels=>{
      this.level = levels.find(l=>l.selected).value;
      this.setOp(this.selectedMode.type);
    });
  }

  isOk(value:number){
    return value === this.currentOp.value.result;
  }

  randomMode(){
    this.setMode(this.modes.value[Math.floor(Math.random() * 3)]);
  }

  randomOpType(){
    return this.modes.value[Math.floor(Math.random() * 3)].type;
  }

  setLevel(selected : Level){
    const levels = this.levels.value;
    levels.forEach(l=>l.selected=false);
    selected.selected = true;
    const i = levels.findIndex(l=>l.value===selected.value);
    this.levels.next(levels);
  }

  setMode(selected : Mode){
    const modes = this.modes.value;
    modes.forEach(m=>m.selected=false);
    selected.selected = true;
    const i = modes.findIndex(m=>m.type===selected.type);
    this.modes.next(modes);
  }

  getOp() : BehaviorSubject<Operation> {
    return this.currentOp;
  }

  setOp(opType : OpType) {

    const level = this.level;
  	const retOperation = new Operation();
  	const coef = this.coefs[level-1];

  	switch(opType) {
  		case OpType.MULTIPLICATION :
  		retOperation.digit1 = Math.floor(coef * (level == 1 ? Math.random() * 10 : 3 + Math.random() * 7));
  		retOperation.digit2 = Math.floor( 1 + Math.random() * 10 );
  		retOperation.opChar = 'x';
  		retOperation.result = retOperation.digit1 * retOperation.digit2;
  		break;

  		case OpType.ADDITION :
  		retOperation.digit1 = Math.floor( Math.random() * 99 );
  		retOperation.digit2 = Math.floor( 1 + Math.random() * (99 - retOperation.digit1) );
  		retOperation.digit1 = Math.floor(retOperation.digit1 * coef);
  		retOperation.digit2 = Math.floor(retOperation.digit2 * coef);
  		retOperation.opChar = '+';
  		retOperation.result = retOperation.digit1 + retOperation.digit2;
  		break;

  		case OpType.SOUSTRACTION :
  		retOperation.digit1 = Math.floor( 10 + Math.random() * 90 );
  		retOperation.digit2 = Math.floor( Math.random() * retOperation.digit1 );
  		retOperation.digit1 = Math.floor(retOperation.digit1 * coef);
  		retOperation.digit2 = Math.floor(retOperation.digit2 * coef);
  		retOperation.opChar = '-';
  		retOperation.result = retOperation.digit1 - retOperation.digit2;
  		break;

  		default :
      return this.setOp(this.randomOpType());
  	}

  	retOperation.type = opType;

  	return this.currentOp.next(retOperation);
  }
}
