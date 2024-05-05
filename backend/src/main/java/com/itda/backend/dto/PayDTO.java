package com.itda.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PayDTO {

    private int orderNumber;
    private String id;
    private int diamonds;
    private int price;
    private String paymentDate;
    private String payCheck;

}
