package isep.webapp.terasync.model.odSystem;

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
public class ProductMenuList {
    @Id
    @GeneratedValue
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
