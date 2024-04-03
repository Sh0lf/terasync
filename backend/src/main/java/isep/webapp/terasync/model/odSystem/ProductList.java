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
public class ProductList {
    @Id
    @GeneratedValue
    @Column(name = "productListId")
    private int productListId;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "productId")
    private int productId;
    @Column(name = "productMenuId")
    private int productMenuId;
}
