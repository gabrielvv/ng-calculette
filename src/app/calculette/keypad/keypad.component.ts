import { Component, OnInit } from '@angular/core';
import { Key } from '../key/key.component';

@Component({
  selector: 'keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {

  //keys : Array<Key> = [];
  rows : Array<Key>[] = [];

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
    // https://www.jstips.co/en/javascript/create-range-0...n-easily-using-one-line/
    //this.rows = Array.from(Array(parseInt(String(keys.length / 9))).keys());
  }

}
