import { FormControl } from "@angular/forms";
import * as moment from 'moment';

export class CustomValidator {

 static dateValidator(control: FormControl){

     const formattedDate = moment(control.value, 'YYYY-MM-DD', true);
      if (!formattedDate.isValid()) {
        console.log('formatted ' + formattedDate);
              return { 'invalid': true };
      }
    return null;
  }
}




