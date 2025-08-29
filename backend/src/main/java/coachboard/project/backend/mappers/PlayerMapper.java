package coachboard.project.backend.mappers;

import coachboard.project.backend.dtos.PlayerDTO;
import coachboard.project.backend.entities.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDTO toDTO(Player player) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.setName(player.getName());
        playerDTO.setAge(player.getAge());
        playerDTO.setPositions(player.getPositions());
        return playerDTO;
    }

    public Player toEntity(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setName(playerDTO.getName());
        player.setAge(playerDTO.getAge());
        player.setPositions(playerDTO.getPositions());
        return player;
    }

}
