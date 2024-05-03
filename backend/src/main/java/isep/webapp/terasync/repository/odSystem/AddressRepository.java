package isep.webapp.terasync.repository.odSystem;

import isep.webapp.terasync.model.odSystem.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Modifying
    @Query("DELETE FROM Address p WHERE p.addressId = :id")
    Integer deleteEntityById(Integer id);
}
