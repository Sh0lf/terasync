package isep.webapp.terasync.service;

import isep.webapp.terasync.model.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;


    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendEmail(Email email) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        mimeMessageHelper.setFrom("terasyncbot@gmail.com");
        mimeMessageHelper.setTo(email.getTo());
        mimeMessageHelper.setSubject(email.getSubject());

        if(email.isHTML()) {
            Context context = new Context();
            context.setVariable("message", email.getBody());
            String processedString = templateEngine.process("password-recovery-template", context);

            mimeMessageHelper.setText(processedString, true);
        } else {
            mimeMessageHelper.setText(email.getBody(), false);
        }

        mailSender.send(mimeMessage);


    }
}
