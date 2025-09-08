package coachboard.project.backend.controller;

import coachboard.project.backend.dtos.PlayerDTO;
import coachboard.project.backend.services.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService){
        this.playerService = playerService;
    }

    @GetMapping("/player/{id}")
    public PlayerDTO getPlayerById(@PathVariable Long id){
        return playerService.getPlayerById(id);
    }

    @GetMapping("/players")
    public List<PlayerDTO> getAllPlayers(){
        return playerService.getAllPlayers();
    }

    @PostMapping("/player")
    public void addPlayer(@RequestBody PlayerDTO playerDTO){
        System.out.println("Received PlayerDTO: " + playerDTO);
        playerService.savePlayer(playerDTO);
    }

    @PutMapping("/player/{id}")
    public void modifyPlayer(@RequestBody PlayerDTO playerDTO, @PathVariable Long id){
        playerService.updatePlayer(playerDTO, id);
        System.out.println("Updated PlayerDTO: " + playerDTO + " with ID: " + id);
    }

    @DeleteMapping("/player/{id}")
    public void deletePlayer(@PathVariable Long id){
        playerService.deletePlayer(id);
    }
}
