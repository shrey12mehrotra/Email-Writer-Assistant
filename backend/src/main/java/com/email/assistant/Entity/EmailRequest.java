package com.email.assistant.Entity;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
