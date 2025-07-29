import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="home-container">
      <h1>Bienvenue sur CoachBoard</h1>
      <p>Utilisez la sidebar pour naviguer dans l'application.</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      font-size: 16px;
    }
  `]
})
export class Home {

}
