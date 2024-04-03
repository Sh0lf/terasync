package isep.webapp.terasync.model;

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
public class RatingList {
    @Id
    @GeneratedValue
    @Column(name = "ratingListId")
    private int ratingListId;
    @Column(name = "rating")
    private double rating;
    @Column(name = "comment")
    private String comment;
    @Column(name = "ratingDate")
    private String ratingDate;
    @Column(name = "customerId")
    private int customerId;
    @Column(name = "businessId")
    private int businessId;
}
