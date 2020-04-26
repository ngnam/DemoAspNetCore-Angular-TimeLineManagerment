import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbTimeAdapter,
  NgbPopoverModule,
  NgbTooltipModule,
  NgbModalModule,
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from './adapters/datepicker.adapter';
import { DatetimeSinceFormatPipe } from './pipes/datetime-since-format.pipe';
import { DefaultImageDirective } from './directives/default-image.directive';
import { NgbTimeStringAdapter } from './adapters/timepicker.adapter';
import { ToastsContainer } from './components/toast-container/toast-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbToastModule
  ],
  declarations: [
    ToastsContainer,
    DatetimeSinceFormatPipe,
    DefaultImageDirective],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Add thirt party librarys
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbToastModule,
    // pipes
    DatetimeSinceFormatPipe,
    // directives
    DefaultImageDirective,
    // components
    ToastsContainer
  ],
  entryComponents: [],
})
export class SharedModule {
}
