package isep.webapp.terasync.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Faq extends isep.webapp.terasync.model.Entity {
    @Id
    @GeneratedValue
    @Column(name = "faqId")
    private int faqId;
    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
}
