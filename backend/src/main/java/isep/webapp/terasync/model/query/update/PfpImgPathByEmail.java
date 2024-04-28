package isep.webapp.terasync.model.query.update;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class PfpImgPathByEmail {
    private String email;
    private String pfpImgPath;

    public PfpImgPathByEmail(String email, String pfpImgPath) {
        this.email = email;
        this.pfpImgPath = pfpImgPath;
    }
}
