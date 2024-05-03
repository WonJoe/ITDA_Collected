package com.itda.backend.dto;

import com.itda.backend.users.Users;
import lombok.Data;

@Data
public class ItemDTO {

    private Long userNo;
    private int diaQty;

    // Users 엔티티로부터 다이아 수량을 가져와서 설정하는 메서드
    public void setDiaQtyFromUser(Users users) {
        this.diaQty = users.getDiaQty();
    }
}
