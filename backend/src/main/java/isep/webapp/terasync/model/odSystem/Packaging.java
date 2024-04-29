package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Packaging extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "packagingId")
    private int packagingId;
    @Column(name = "packaging")
    private String packaging;
}
