package coachboard.project.backend.controller;

import coachboard.project.backend.dtos.PlayerDTO;
import coachboard.project.backend.services.PlayerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService){
        this.playerService = playerService;
    }

    @GetMapping("player/{id}")
    public PlayerDTO getPlayerById(@PathVariable Long id){
        return playerService.getPlayerById(id);
    }

    @GetMapping("players")
    public List<PlayerDTO> getAllPlayers(){
        return playerService.getAllPlayers();
    }

    @PostMapping("player")
    public void addPlayer(@RequestBody PlayerDTO playerDTO){
        playerService.savePlayer(playerDTO);
    }
}
