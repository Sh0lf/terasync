package isep.webapp.terasync.model;

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
public class MessageList {
    @Id
    @GeneratedValue
    @Column(name = "messageListId")
    private int messageListId;
    @Column(name = "message")
    private String message;
    @Column(name = "timestamp")
    private String timestamp;
    @Column(name = "ownerId")
    private int ownerId;
    @Column(name = "customerOrderId")
    private int customerOrderId;
}
