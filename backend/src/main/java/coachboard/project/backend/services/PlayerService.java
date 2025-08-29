package coachboard.project.backend.services;

import coachboard.project.backend.dtos.PlayerDTO;

import java.util.List;

public interface PlayerService {
    PlayerDTO savePlayer(PlayerDTO playerDTO);
    PlayerDTO getPlayerById(Long id);

    List<PlayerDTO> getAllPlayers();
}
