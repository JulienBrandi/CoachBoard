package coachboard.project.backend.dtos;

import coachboard.project.backend.entities.Position;
import lombok.*;

import java.util.List;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder @ToString
public class PlayerDTO {
    private long id;
    private String name;
    private int age;
    private List<String> positions;
}
