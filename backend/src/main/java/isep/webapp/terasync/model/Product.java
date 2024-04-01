package isep.webapp.terasync.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter @AllArgsConstructor
public class Product {
    private Long foodId;
    private String foodName;
    private String foodDesc;
    private String vegNonVeg;
    private float foodPrice;
}
