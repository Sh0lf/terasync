package isep.webapp.terasync.model.query.update;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusIdByCustomerOrderId {
    private Integer statusId;
    private Integer customerOrderId;
}
