package isep.webapp.terasync.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MessageList extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue
    @Column(name = "messageListId")
    private int messageListId;
    @Column(name = "message")
    private String message;
    @CreationTimestamp
    @Column(name = "timestamp")
    private String timestamp;
    @Column(name = "ownerId")
    private int ownerId;
    @Column(name = "customerOrderId")
    private int customerOrderId;
}
