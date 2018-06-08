import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ModeComponent,
  ScoreComponent,
  OperationsComponent,
  LevelComponent,
  KeyComponent,
  KeypadComponent,
  StepsComponent
} from './components';

import { CalculetteComponent } from './calculette.component';

import { OperationsService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CalculetteComponent],
  declarations: [
    CalculetteComponent,
    ModeComponent,
    ScoreComponent,
    OperationsComponent,
    LevelComponent,
    KeyComponent,
    KeypadComponent,
    StepsComponent
  ],
  providers: [OperationsService]
})
export class CalculetteModule { }
