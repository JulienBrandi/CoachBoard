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
  protected idPlayersEdited = 0;

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
    if(this.idPlayersEdited > 0) {
      console.log('Player updated:', this.newPlayer);
      this.http.put<Player>(`http://localhost:8080/player/${this.idPlayersEdited}`, this.newPlayer)
        .subscribe({
          next: (player) => {
            this.fetchPlayers();
            this.cancelForm();
            this.idPlayersEdited = 0;
          }
        });
    } else if (this.newPlayer.name && this.newPlayer.age > 0 && this.newPlayer.positions.length > 0) {
        console.log('Player saved:', this.newPlayer);
        this.http.post<Player>('http://localhost:8080/player', this.newPlayer)
          .subscribe({
            next: (player) => {
            this.fetchPlayers();
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

  protected editPlayer(player: Player) {
    this.showForm = true;
    this.newPlayer = {
      name: player.name,
      age: player.age,
      positions: [...player.positions]
    };
    this.idPlayersEdited = player.id;
  }

  protected deletePlayer(id: number) {
    this.http.delete(`http://localhost:8080/player/${id}`)
      .subscribe({
        next: () => {
          this.players = this.players.filter(player => player.id !== id);
          console.log(`Player with id ${id} deleted.`);
        },
        error: (err) => {
          console.error('Error deleting player:', err);
        }
      });
  }
}
