import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './key/key.component';
import { KeypadComponent } from './keypad/keypad.component';
import { CalculetteComponent } from './calculette.component';

const COMPONENT = [
  KeyComponent,
  KeypadComponent,
  CalculetteComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [...COMPONENT],
  declarations: [...COMPONENT]
})
export class CalculetteModule { }
