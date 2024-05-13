package isep.webapp.terasync.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RatingList extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ratingListId")
    private int ratingListId;
    @Column(name = "rating")
    private double rating;
    @Column(name = "comment")
    private String comment;
    @CreationTimestamp
    @Column(name = "ratingDate")
    private String ratingDate;
    @Column(name = "customerId")
    private int customerId;
    @Column(name = "businessId")
    private int businessId;
    @Column(name = "customerOrderId")
    private int customerOrderId;

//    @ManyToOne(
//            fetch = FetchType.EAGER,
//            targetEntity = CustomerOrder.class
//    )
//    @JoinColumn(
//            name = "customerOrderId",
//            insertable = false,
//            updatable = false
//    )
//    private CustomerOrder customerOrder;
}
