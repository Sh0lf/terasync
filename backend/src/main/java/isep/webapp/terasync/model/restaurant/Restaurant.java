package isep.webapp.terasync.model.restaurant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter @Getter @AllArgsConstructor
public class Restaurant {
    private Long restoId;
    private String restoName;
    private String restoPwd;
    private String restoEmail;
    private Long restoPhone;
    private String restoLocation;
    private List<Menu> menus;
}
