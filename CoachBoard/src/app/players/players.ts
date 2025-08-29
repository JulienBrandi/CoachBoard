import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import as from '@angular/common/locales/extra/as';


interface Player {
  id: number;
  name: string;
  age: number;
  position: string[];
}

@Component({
  selector: 'app-players',
  imports: [CommonModule, FormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  protected players: Player[] = [
    { id: 1, name: 'Lionel Messi', age: 36, position: ['Attaquant'] },
    { id: 2, name: 'Luka Modric', age: 38, position: ['Milieu'] },
    { id: 3, name: 'Sergio Ramos', age: 37, position: ['Défenseur'] }
  ];

  // État du formulaire
  protected showForm = false;
  protected newPlayer: Omit<Player, 'id'> = {
    name: '',
    age: 0,
    position: [] as string[]
  };

  // Options pour le poste
  protected positions = [
    'Gardien',
    'Défenseur central',
    'Défenseur Gauche',
    'Défenseur Droit',
    'Milieu défensif',
    'Milieu central',
    'Milieu offensif',
    'Ailier Droit',
    'Ailier Gauche',
    'Attaquant'
  ];

  constructor() {
    // Initialisation ou récupération des données des joueurs
  }

  protected addPlayer() {
    this.showForm = true;
  }

  protected onPositionChange(event: Event, position: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.newPlayer.position.includes(position)) {
        this.newPlayer.position.push(position);
      }
    } else {
      this.newPlayer.position = this.newPlayer.position.filter(pos => pos !== position);
    }
  }

  protected savePlayer() {
    if (this.newPlayer.name && this.newPlayer.age > 0 && this.newPlayer.position) {
      const player: Player = {
        id: Math.max(...this.players.map(p => p.id)) + 1,
        ...this.newPlayer
      };
      this.players.push(player);
      this.cancelForm();
    }
  }

  protected cancelForm() {
    this.showForm = false;
    this.newPlayer = {
      name: '',
      age: 0,
      position: ['']
    };
  }

  protected deletePlayer(id: number) {
    this.players = this.players.filter(player => player.id !== id);
  }
}
