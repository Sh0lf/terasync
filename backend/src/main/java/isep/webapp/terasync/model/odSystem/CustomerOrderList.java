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
public class CustomerOrderList {
    @Id
    @GeneratedValue
    @Column(name = "customerOrderListId")
    private int customerOrderListId;
    @Column(name = "selectionTime")
    private String selectionTime;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @Column(name = "productId")
    private int productId;
}
