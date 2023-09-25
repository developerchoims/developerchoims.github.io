package com.ds.dasony.donation.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationList {


private int donaExecuteNo;//   DONA_EXECUTE_NO 기부 실행 번호
private int donaAmount;//   DONA_AMOUNT 기부 금액
private Date donaExecuteDate;//   DONA_EXECUTE_DATE 기부 실행 날짜
private long userNo;//   USER_NO
private int donaNo;//   DONA_NO 기부 글 번호
private String donaName;
private String userName;
}
