package isep.webapp.terasync.model.restaurant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter @Getter @AllArgsConstructor
public class Food {
    private Long foodId;
    private String foodName;
    private String foodDesc;
    private String vegNonVeg;
    private float foodPrice;
}
