package isep.webapp.terasync.service.user;

import isep.webapp.terasync.model.query.select.ByToken;
import isep.webapp.terasync.model.query.update.*;
import isep.webapp.terasync.model.user.DeliveryService;
import isep.webapp.terasync.repository.user.DeliveryServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryServiceService extends UserService<DeliveryService, DeliveryServiceRepository> {
    @Autowired
    public DeliveryServiceService(DeliveryServiceRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    @Override
    public DeliveryService selectByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public DeliveryService selectByToken(ByToken byToken) {
        return entityRepository.findByToken(byToken.getToken());
    }

    @Transactional
    public Integer verifyEmail(String email) {
        return entityRepository.verifyEmail(email);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(PasswordByEmail passwordByEmail) {
        return entityRepository.updatePasswordByEmail(passwordByEmail.getEmail(), passwordByEmail.getNewPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(TokenByEmail tokenByEmail) {
        return entityRepository.updateTokenByEmail(tokenByEmail.getEmail(), tokenByEmail.getNewToken());
    }

    @Transactional
    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }

    @Transactional
    @Override
    public Integer updatePfpImgPathByEmail(PfpImgPathByEmail pfpImgPathByEmail) {
        return entityRepository.updatePfpImgPathByEmail(pfpImgPathByEmail.getEmail(), pfpImgPathByEmail.getPfpImgPath());
    }

    @Transactional
    public Integer updateApprovalByEmail(ApprovementByEmail approvementByEmail) {
        return entityRepository.updateApprovalByEmail(approvementByEmail.getEmail(), approvementByEmail.isApproved());
    }
}
