package src.main.java.isep.webapp.terasync.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import src.main.java.isep.webapp.terasync.model.restaurant.Food;
import src.main.java.isep.webapp.terasync.model.restaurant.Restaurant;

import java.util.List;

@Setter @Getter @AllArgsConstructor
public class Order {
    private Long orderId;
    private Restaurant restaurant;
    private List<Food> foods;
}
