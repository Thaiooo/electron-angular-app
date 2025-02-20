import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'electron-angular-app-2';
  params: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Paramètres angular reçus:', params);
      this.params = params;
      
      if (params['page'] === '1') {
        this.router.navigate(['/page1'], {
          queryParams: { other: params['other'] }
        });
      } else if (params['page'] === '2') {
        this.router.navigate(['/page2'], {
          queryParams: { other: params['other'] }
        });
      }
    });
  }

}
