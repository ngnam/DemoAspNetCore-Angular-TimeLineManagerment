import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from './adapters/datepicker.adapter';
import { DatetimeSinceFormatPipe } from './pipes/datetime-since-format.pipe';
import { DefaultImageDirective } from './directives/default-image.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ],
  declarations: [
    DatetimeSinceFormatPipe,
    DefaultImageDirective],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Add thirt party librarys
    NgbDatepickerModule,
    NgbTimepickerModule,
    // pipes
    DatetimeSinceFormatPipe,
    // directives
    DefaultImageDirective
  ],
  entryComponents: [],
})
export class SharedModule {
}
