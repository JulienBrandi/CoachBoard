import { Routes } from '@angular/router';
import { Players } from './players/players';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'players', component: Players }
];  
