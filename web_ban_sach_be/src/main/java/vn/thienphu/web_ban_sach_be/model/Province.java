package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "province_id")
    private long provinceID;

    @Column(name = "province_name", length = 50, nullable = false)
    private String provinceName;

    @Column(name = "province_type", length = 50, nullable = false)
    private String provinceType;

    @OneToMany(mappedBy = "province")
    private List<District> districts;
}
