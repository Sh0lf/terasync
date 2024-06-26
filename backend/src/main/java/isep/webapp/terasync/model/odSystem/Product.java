package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private int productId;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "vegan")
    private boolean vegan;
    @Column(name = "price")
    private float price;
    @CreationTimestamp
    @Column(name = "creationTime")
    private String creationTime;
    @Column(name = "businessId")
    private int businessId;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = ProductImage.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "productId")
    private List<ProductImage> productImages;


}
