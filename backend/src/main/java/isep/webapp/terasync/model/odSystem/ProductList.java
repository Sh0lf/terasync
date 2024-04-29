package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductList extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productListId")
    private int productListId;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "productId")
    private int productId;
    @Column(name = "productMenuId")
    private int productMenuId;
}
