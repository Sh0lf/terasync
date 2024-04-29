package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductMenuList extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productMenuListId")
    private int productMenuListId;
    @CreationTimestamp
    @Column(name = "selectionTime")
    private String selectionTime;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @Column(name = "productMenuId")
    private int productMenuId;
}
