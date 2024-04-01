package src.main.java.isep.webapp.terasync.model.restaurant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter @AllArgsConstructor
public class Menu {
    private Long menuId;
    private List<Food> foods;
}
