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
public class ProductMenuList {
    @Id
    @GeneratedValue
    @Column(name = "productMenuListId")
    private int productMenuListId;
    @Column(name = "selectionTime")
    private String selectionTime;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "customerOrderId")
    private int customerOrderId;
    @Column(name = "productMenuId")
    private int productMenuId;
}
