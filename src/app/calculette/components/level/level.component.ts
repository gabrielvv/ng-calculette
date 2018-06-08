import { Component, OnInit } from '@angular/core';
import { OperationsService, Level } from '../../services';
import { Observable } from "rxjs";

@Component({
  selector: 'calc-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels$ : Observable<Level[]>;

  constructor(private operationsService: OperationsService) {
    this.levels$ = operationsService.levels;
  }

  ngOnInit() {

  }

  select(l : Level){
    this.operationsService.setLevel(l);
  }
}
