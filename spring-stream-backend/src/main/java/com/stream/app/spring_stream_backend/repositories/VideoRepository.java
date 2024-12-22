package com.stream.app.spring_stream_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stream.app.spring_stream_backend.entities.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {

	Optional<Video> findByTitle(String title);  // automatically implemented
//	Optional<Video> findById(int videoId);  // automatically implemented
}
