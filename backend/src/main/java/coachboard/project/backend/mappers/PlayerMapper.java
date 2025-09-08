package coachboard.project.backend.mappers;

import coachboard.project.backend.dtos.PlayerDTO;
import coachboard.project.backend.entities.Player;
import coachboard.project.backend.entities.Position;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PlayerMapper {

    public PlayerDTO toDTO(Player player) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.setId(player.getId());
        playerDTO.setName(player.getName());
        playerDTO.setAge(player.getAge());
        playerDTO.setPositions(
                player.getPositions()
                        .stream()
                        .map(Enum::name)
                        .collect(Collectors.toList())
        );
        return playerDTO;
    }

    public Player toEntity(PlayerDTO playerDTO) {
        Player player = new Player();
        if(playerDTO.getId() != 0)
            player.setId(playerDTO.getId());
        player.setName(playerDTO.getName());
        player.setAge(playerDTO.getAge());
        player.setPositions(
                playerDTO.getPositions()
                        .stream()
                        .map(Position::valueOf) // "GK" -> Position.GK
                        .collect(Collectors.toList()));
        return player;
    }

}
