package com.ds.dasony.event.model.service;

import java.io.UnsupportedEncodingException;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ds.dasony.event.model.vo.Email;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

	@Autowired
	private JavaMailSender sender;
	
	public void sendEmail(Email email) {
        
//		SimpleMailMessage message = new SimpleMailMessage();
		MimeMessage message = sender.createMimeMessage();
		try {
			message.setFrom(new InternetAddress("wlgu7283@gmail.com","다소니","UTF-8"));
			message.setSubject(email.getTitle());
			message.setText(email.getText(), "utf-8");
//        message.setTo("leeain317@gmail.com");
			message.addRecipients(Message.RecipientType.TO, email.getReceiverEmail());
			sender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        
	}
}
