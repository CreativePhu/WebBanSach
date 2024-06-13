package vn.thienphu.web_ban_sach_be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "war_id")
    private long warID;

    @Column(name = "war_name", length = 50, nullable = false)
    private String warName;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
}
