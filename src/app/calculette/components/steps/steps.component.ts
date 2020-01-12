import { Component, OnInit, Input } from '@angular/core';

export enum StepState {
  UNDEFINED,
  WRONG = 'ko',
  GOOD = 'ok',
}

@Component({
  selector: 'calc-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  @Input('steps') steps : Array<StepState>;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes){
    // TODO
  }

}
