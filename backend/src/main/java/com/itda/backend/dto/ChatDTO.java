package com.itda.backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDTO {

    private int chatNum;
    private String senderId;
    private String receiverId;
    private String message;
    private LocalDateTime timestamp;

}
