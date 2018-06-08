import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calc-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input('ok') good : number = 0;
  @Input('ko') wrong : number = 0;

  constructor() { }

  ngOnInit() {
  }

}
