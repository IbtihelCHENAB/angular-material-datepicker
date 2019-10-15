import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import {CustomValidator} from './custom-validator.component';

export const MY_FORMATS = {
  parse: {
    dateInput: ['DDMMYY', 'DDMMYYYY', 'DD MMM YYYY', 'DD MMM YY']
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AppComponent {
  title = 'datepicker-input-check';
  date = new FormControl(
    'date', [
      Validators.required,
      CustomValidator.dateValidator
     // Validators.pattern('^(0[1-9]|1\d|2\d|3[01])(0[1-9]|1[0-2])((19|20)\d{2}|\d{2})$')
    ]
  );
  // minDate is the start of today.
  minDate = new Date(new Date().setHours(0, 0, 0, 0));

  getErrorMessage(pickerInput: string): string {
    if (!pickerInput || pickerInput === '' ) {
      return 'Please choose a date.';
    }
    return this.isMyDateFormat(pickerInput);
  }

  isMyDateFormat(date: string): string {
    const regex1 = /^(0[1-9]|1\d|2\d|3[01])(0[1-9]|1[0-2])((19|20)\d{2}|\d{2})$/;
    const regex2 = /^[01][0-9] (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}|\d{4})$/;

    if (!regex1.test(date) && !regex2.test(date) ){
     return 'Invalid input: Please input a date in the form of DDMMYYYY or DDMMYY or DD MMM YYYY or DD MMM YY';
    }
    return 'Unknown error';
  }
}

    /*if (date.length !== 10) {
      return 'Invalid input: Please input a string in the form of YYYY-MM-DD';
    } else {
      const da = date.split('-');
      if (da.length !== 3 || da[0].length !== 4 || da[1].length !== 2 || da[2].length !== 2) {
        return 'Invalid input: Please input a string in the form of YYYY-MM-DD';
      } else if (moment(date).isValid()) {
        return 'Invalid date: Please input a date no later than today';
      } else if (!moment(date).isValid()) {
        return 'Invalid date: Please input a date with a valid month and date.';
      }
    }*/
