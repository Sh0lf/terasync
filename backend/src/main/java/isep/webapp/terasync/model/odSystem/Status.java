package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Status {
    @Id
    @GeneratedValue
    @Column(name = "statusId")
    private int statusId;
    @Column(name = "status")
    private String status;
}
