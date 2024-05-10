package isep.webapp.terasync.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageListId")
    private int messageListId;
    @Column(name = "message")
    private String message;
    @CreationTimestamp
    @Column(name = "timestamp")
    private String timestamp;
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @Column(name = "adminId")
    private int adminId;
    @Column(name = "customerId")
    private int customerId;
    @Column(name = "businessId")
    private int businessId;
    @Column(name = "deliveryServiceId")
    private int deliveryServiceId;
    @Column(name = "deliveryPersonId")
    private int deliveryPersonId;
}
