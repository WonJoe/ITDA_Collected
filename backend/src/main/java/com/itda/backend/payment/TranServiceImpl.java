package com.itda.backend.payment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.dto.CartDTO;
import com.itda.backend.dto.ChatDTO;
import com.itda.backend.dto.PayDTO;
import com.itda.backend.dto.TestDTO;
import com.itda.backend.mapper.TestMapper;

@Service
public class TranServiceImpl implements TranService {

    @Override
    public List<PayDTO> payList(String id) throws Exception {

        return testMapper.payList(id);
    }

    @Override
    public int payMaxNum() throws Exception {

        return testMapper.payMaxNum();
    }

    @Override
    public void paymentInsert(PayDTO dto) throws Exception {

        testMapper.paymentInsert(dto);

    }

    @Override
    public List<CartDTO> basketList(String id) throws Exception {

        return testMapper.basketList(id);
    }

    @Override
    public void insertBasket(CartDTO dto) throws Exception {

        testMapper.insertBasket(dto);

    }

    @Override
    public int basketMaxNum() throws Exception {

        return testMapper.basketMaxNum();
    }

    @Autowired
    private TestMapper testMapper;

    @Override
    public void insertChat(ChatDTO dto) throws Exception {

        testMapper.insertChat(dto);
    }

    @Override
    public void updateLog(TestDTO dto) throws Exception {

        testMapper.updateLog(dto);

    }

    @Override
    public List<ChatDTO> ranDomChatList(ChatDTO dto) throws Exception {

        return testMapper.ranDomChatList(dto);
    }

    @Override
    public List<ChatDTO> ranChatList(String id) throws Exception {

        return testMapper.ranChatList(id);
    }

    @Override
    public int ranMaxNum() throws Exception {

        return testMapper.ranMaxNum();
    }

    @Override
    public void insertRanChat(ChatDTO dto) throws Exception {

        testMapper.insertRanChat(dto);

    }

    @Override
    public List<TestDTO> ranList(String id) throws Exception {

        return testMapper.ranList(id);

    }

    @Override
    public int maxNum() throws Exception {

        return testMapper.maxNum();
    }

    @Override
    public TestDTO idCheck(String id) throws Exception {

        return testMapper.idCheck(id);

    }

    @Override
    public void insertDate(TestDTO dto) throws Exception {

        testMapper.insertDate(dto);
    }

    @Override
    public List<TestDTO> getList() throws Exception {

        return testMapper.getList();
    }

    @Override
    public List<ChatDTO> chatList(ChatDTO dto) throws Exception {

        return testMapper.chatList(dto);
    }

}
