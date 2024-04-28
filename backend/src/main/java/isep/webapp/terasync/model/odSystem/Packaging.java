package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Packaging extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue
    @Column(name = "packagingId")
    private int packagingId;
    @Column(name = "packaging")
    private String packaging;
}
