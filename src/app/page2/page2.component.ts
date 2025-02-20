import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Page 2</h1>
    <p>Paramètre 'other': {{ otherParam }}</p>
  `
})
export class Page2Component {
  otherParam: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.otherParam = params['other'];
    });
  }
} 