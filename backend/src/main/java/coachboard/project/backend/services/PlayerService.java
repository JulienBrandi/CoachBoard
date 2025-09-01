package coachboard.project.backend.services;

import coachboard.project.backend.dtos.PlayerDTO;

import java.util.List;

public interface PlayerService {
    PlayerDTO savePlayer(PlayerDTO playerDTO);
    PlayerDTO getPlayerById(Long id);
    PlayerDTO updatePlayer(PlayerDTO playerDTO, Long id);
    void deletePlayer(Long id);
    List<PlayerDTO> getAllPlayers();
}
