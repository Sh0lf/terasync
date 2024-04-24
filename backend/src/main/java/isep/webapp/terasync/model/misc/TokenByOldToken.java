package isep.webapp.terasync.model.misc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenByOldToken {
    private String oldToken;
    private String newToken;
}
