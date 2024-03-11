package com.abclaboratory.backend.controller;

import com.abclaboratory.backend.entity.PaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

// PaymentController.java
@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/pay")
    public ResponseEntity<String> payBill(@RequestBody PaymentRequest paymentRequest) {

        String senderAddress = "anushujan3@gmail.com";
        String receiptContent = "Payment for Your Bill\n\n" +
                "Thank you for your payment of $" + paymentRequest.getAmount() +
                " to ABC Laboratory. Below are the receipt details:\n\n" +
                "--------------------------------------------------\n" +
                "Details:\n" +
                "Amount: $" + paymentRequest.getAmount() + "\n" +
                "--------------------------------------------------\n" +
                "ABC Laboratory Contact Information:\n" +
                "Phone: +94 1234 567\n" +
                "Email: abclabs@gmail.com\n" +
                "Website: www.abclaboratory.com\n" +
                "--------------------------------------------------\n" +
                "We appreciate your business!";

        sendReceiptEmail(senderAddress, paymentRequest.getEmail(), "ABC Laboratory - Payment Receipt", receiptContent);

        return ResponseEntity.ok("Bill paid successfully. Receipt sent via email.");
    }


    private void sendReceiptEmail(String from,String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);

        javaMailSender.send(message);
    }
}