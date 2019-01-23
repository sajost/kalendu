import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class DeDateParserFormatter extends NgbDateParserFormatter {


    format (date: NgbDateStruct): string {
        if (date === null) {
            return '';
        }
        let month = '' + (date.month + 0);
        let day = '' + date.day;
        const year = date.year;
        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }
        return [day, month, year].join('.');
    }

    parse (value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const parts = value.split('.');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        return { year: +parts[2], month: +parts[1], day: +parts[0] };
    }
}
