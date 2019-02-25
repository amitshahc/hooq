import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'includes-alert-error',
  template: `    
      <div class="alert {{status.class}} mx-3">{{ status.text }}</div>    
  `,
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent{
  @Input() status:{ text: string, class: string}
}
