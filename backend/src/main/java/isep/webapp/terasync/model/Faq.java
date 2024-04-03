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
public class Faq {
    @Id
    @GeneratedValue
    @Column(name = "faqId")
    private int faqId;
    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
}
