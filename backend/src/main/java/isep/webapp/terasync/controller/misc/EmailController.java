package isep.webapp.terasync.controller.misc;

import isep.webapp.terasync.model.misc.Email;
import isep.webapp.terasync.service.misc.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {
    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public boolean sendEmail(@RequestBody Email email) {
//        try {
//            emailService.sendEmail(email);
//            return true;
//        } catch (MessagingException e) {
//            System.out.println(e.getMessage());
//            return false;
//        }

        // Disabled sending emails for now to avoid spamming
        return true;
    }
}
