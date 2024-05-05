package com.itda.backend.payment;

import java.util.List;

import com.itda.backend.dto.CartDTO;
import com.itda.backend.dto.ChatDTO;
import com.itda.backend.dto.PayDTO;
import com.itda.backend.dto.TestDTO;

public interface TranService {

    public void insertDate(TestDTO dto) throws Exception;

    public TestDTO idCheck(String id) throws Exception;

    public List<TestDTO> getList() throws Exception;

    public List<TestDTO> ranList(String id) throws Exception;

    public List<ChatDTO> chatList(ChatDTO dto) throws Exception;

    public void insertRanChat(ChatDTO dto) throws Exception;

    public void updateLog(TestDTO dto) throws Exception;

    public void insertChat(ChatDTO dto) throws Exception;

    public int maxNum() throws Exception;

    public int ranMaxNum() throws Exception;

    public List<ChatDTO> ranChatList(String id) throws Exception;

    public List<ChatDTO> ranDomChatList(ChatDTO dto) throws Exception;

    public int basketMaxNum() throws Exception;

    public void insertBasket(CartDTO dto) throws Exception;

    public List<CartDTO> basketList(String id) throws Exception;

    public void paymentInsert(PayDTO dto) throws Exception;

    public int payMaxNum() throws Exception;

    public List<PayDTO> payList(String userId) throws Exception;

}
