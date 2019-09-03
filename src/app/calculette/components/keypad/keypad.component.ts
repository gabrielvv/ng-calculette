import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Key, KeyState } from '../key/key.component';

@Component({
  selector: 'calc-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit, OnChanges {

  rows : Array<Key>[] = [];
  @Output() onClick = new EventEmitter<number>();
  @Input() wrong : number;
  @Input() good : number;
  @Input('reset') resetTrigger : number;
  @Input() disabledKeys : Array<number>;

  constructor() { }

  ngOnInit() {
    var rows = [];
    for (var i=0;i<=9;i++) {
      var row = [];
    	for (var j=0;j<=9;j++) {
    		var v = i*10 + j;
        row.push(new Key(v));
    	}
      rows.push(row);
    }

    this.rows = rows;
  }


  reset(){
    this.findAll(
      k=>k.state!=KeyState.GOOD,
      k=>k.state=KeyState.ENABLED
    );
  }

  findKey(filter, process){
    for(let keys of this.rows){
      for(let k of keys){
        if(filter(k)){
          process(k);
          break;
        }
      }
    }
  }

  findAll(filter, process){
    for(let keys of this.rows){
      for(let k of keys){
        if(filter(k)){
          process(k);
        }
      }
    }
  }

  ngOnChanges(changes){
    if(changes.wrong){
      const v = changes.wrong.currentValue;
      this.findKey(
        k=>k.value == v,
        k=>k.state = KeyState.WRONG
      );
    }

    if(changes.good){
      const v = changes.good.currentValue;
      this.findKey(
        k=>k.value == v,
        (k)=>{
          k.state = KeyState.GOOD;
          setTimeout(()=>k.state = KeyState.ENABLED, 200);
        }
      );
    }

    changes.resetTrigger && this.reset();

    if(changes.disabledKeys){
      const disabledKeys = changes.disabledKeys.currentValue;
      if(disabledKeys.length){
        this.findAll(
          k => ~disabledKeys.indexOf(k.value),
          k => k.state = KeyState.DISABLED
        );
      }
    }
  }

}
