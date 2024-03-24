import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect'
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    SelectButtonModule,
    CalendarModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    AccordionModule,
    MultiSelectModule,
    FormsModule,
    SkeletonModule,
    // ... add other PrimeNG modules here
  ],
  exports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    SelectButtonModule,
    CalendarModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    AccordionModule,
    MultiSelectModule,
    FormsModule,
    SkeletonModule,
    // ... also export them here
  ]
})
export class PrimeNgLightModule { }
