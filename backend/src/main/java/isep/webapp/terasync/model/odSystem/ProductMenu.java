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
public class ProductMenu {
    @Id
    @GeneratedValue
    @Column(name = "productMenuId")
    private int productMenuId;
    @Column(name = "name")
    private String name;
    @Column(name = "creationTime")
    private String creationTime;
    @Column(name = "discount")
    private double discount;
    @Column(name = "isVegan")
    private boolean isVegan;
    @Column(name = "businessId")
    private int businessId;
}
