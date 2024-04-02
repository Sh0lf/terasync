package isep.webapp.terasync.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private Long productId;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "isVegan")
    private boolean isVegan;
    @Column(name = "price")
    private float price;
    @Column(name = "restaurantId")
    private Long restaurantId;
}
