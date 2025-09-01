package coachboard.project.backend.services;

import coachboard.project.backend.dtos.PlayerDTO;
import coachboard.project.backend.entities.Player;
import coachboard.project.backend.mappers.PlayerMapper;
import coachboard.project.backend.repositories.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService{

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;

    public PlayerServiceImpl(PlayerRepository playerRepository, PlayerMapper playerMapper){
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
    }

    @Override
    public PlayerDTO savePlayer(PlayerDTO playerDTO) {
        return this.playerMapper.toDTO(playerRepository.save(this.playerMapper.toEntity(playerDTO)));
    }

    @Override
    public PlayerDTO getPlayerById(Long id) {
        Player player = playerRepository.findById(id).orElseThrow(() -> new RuntimeException("Player not found"));
        return playerMapper.toDTO(player);
    }

    @Override
    public PlayerDTO updatePlayer(PlayerDTO playerDTO, Long id) {
        Player existingPlayer = playerRepository.findById(id).orElseThrow(() -> new RuntimeException("Player not found"));
        existingPlayer = playerMapper.toEntity(playerDTO);
        return playerMapper.toDTO(playerRepository.save(existingPlayer));
    }

    @Override
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

    @Override
    public List<PlayerDTO> getAllPlayers() {
        List<Player> players = playerRepository.findAll();
        return players.stream().map(playerMapper::toDTO).toList();
    }
}
