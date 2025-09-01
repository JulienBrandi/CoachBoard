import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import as from '@angular/common/locales/extra/as';
import { error } from 'console';


interface Player {
  id: number;
  name: string;
  age: number;
  positions: string[];
}

@Component({
  selector: 'app-players',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  protected players: Player[] = [];

  constructor(private http: HttpClient) {
    this.fetchPlayers();
  }

  protected fetchPlayers() {
    this.http.get<Player[]>('http://localhost:8080/players')
      .subscribe(players => {
        this.players = players;
        console.log(this.players);
      });
  }

  // État du formulaire
  protected showForm = false;
  protected newPlayer: Omit<Player, 'id'> = {
    name: '',
    age: 0,
    positions: [] as string[]
  };

  // Options pour le poste
  protected positions = [  
    { alias: "GK", label: "Gardien" },
    { alias: "DG", label: "Défenseur Gauche" },
    { alias: "DC", label: "Défenseur Central" },
    { alias: "DD", label: "Défenseur Droit" },
    { alias: "MD", label: "Milieu Défensif" },
    { alias: "MC", label: "Milieu Central" },
    { alias: "MO", label: "Milieu Offensif" },
    { alias: "AiG", label: "Ailier Gauche" },
    { alias: "AiD", label: "Ailier Droit" },
    { alias: "BU", label: "Buteur" }
  ];

  protected addPlayer() {
    this.showForm = true;
  }

  protected onPositionChange(event: Event, position: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.newPlayer.positions.includes(position)) {
        this.newPlayer.positions.push(position);
      }
    } else {
      this.newPlayer.positions = this.newPlayer.positions.filter(pos => pos !== position);
    }
  }

  protected savePlayer() {
    /*if (this.newPlayer.name && this.newPlayer.age > 0 && this.newPlayer.position) {
      const player: Player = {
        id: Math.max(...this.players.map(p => p.id)) + 1,
        ...this.newPlayer
      };
      this.players.push(player);
      this.cancelForm();
    }*/

    if (this.newPlayer.name && this.newPlayer.age > 0 && this.newPlayer.positions.length > 0) {
      console.log('Player saved:', this.newPlayer);
      this.http.post<Player>('http://localhost:8080/player', this.newPlayer)
        .subscribe({
          next: (player) => {
            this.fetchPlayers(); // Re-fetch the players to get the updated list
            this.cancelForm();
          },
          error: (err) => {
            console.error('Error saving player:', err);
          }
        });
    }
  }

  protected cancelForm() {
    this.showForm = false;
    this.newPlayer = {
      name: '',
      age: 0,
      positions: []
    };
  }

  protected deletePlayer(id: number) {
    this.players = this.players.filter(player => player.id !== id);
  }
}
