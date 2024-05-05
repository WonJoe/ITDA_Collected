package com.itda.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartDTO {

    private int basketNumber;
    private String id;
    private String name;
    private int diamonds;
    private int price;
    private String basketDate;

}
