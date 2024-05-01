package isep.webapp.terasync.model.odSystem;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.List;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductMenu extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productMenuId")
    private int productMenuId;
    @Column(name = "name")
    private String name;
    @CreationTimestamp
    @Column(name = "creationTime")
    private String creationTime;
    @Column(name = "discount")
    private double discount;
    @Column(name = "isVegan")
    private boolean isVegan;
    @Column(name = "businessId")
    private int businessId;


    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = ProductList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "productMenuId")
    private List<ProductList> productLists;

    @OneToMany(
            fetch = FetchType.EAGER,
            targetEntity = ProductMenuList.class,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "productMenuId")
    private List<ProductMenuList> productMenuLists;
}
