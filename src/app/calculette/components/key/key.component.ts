import { Component, OnInit, Input } from '@angular/core';

export enum KeyState {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
  WRONG = 'ko',
  GOOD = 'ok',
}

export class Key {
  constructor(v){
    this.value = v;
    this.state = KeyState.ENABLED;
  }
  value: String;
  state: KeyState;
}

@Component({
  selector: 'calc-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  @Input() key : Key;

  constructor() { }

  ngOnInit() {
  }

}
