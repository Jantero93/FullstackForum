package com.example.fullstackforum.topic;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.post.Post;
import com.example.fullstackforum.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private String topicName;

    @OneToMany
    private List<Post> posts;

    @ManyToOne
    private Board board;

    @ManyToOne
    private User user;

}
