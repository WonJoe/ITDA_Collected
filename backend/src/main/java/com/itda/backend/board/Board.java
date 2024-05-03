package com.itda.backend.board;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;

import com.itda.backend.users.Users;

import lombok.Data;

@Entity(name = "Board")
@Data
public class Board {

    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_seq_generator")
    @SequenceGenerator(name = "board_seq_generator", sequenceName = "BOARD_SEQ", allocationSize = 1)
    private Long boardNo;

    @Column
    private String title;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users writer;

    @Column(name = "time_stamp")
    private LocalDate timeStamp;

    @Column(name = "report_count")
    private int reportCount;

    @Column(name = "writer_id")
    private String writerId;

    @PrePersist
    public void timeStamp() {
        this.timeStamp = LocalDate.now();
    }

    public LocalDate getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDate timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Board orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
}
