package com.stream.app.spring_stream_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Video {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "video_id")
	private int videoId;
	
	private String title;
	
	private String description;
	
	private String contentType;
	
	private String filePath;
	

	public String getTitle() {
        return title;
    }

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
        return description;
    }
	
	public void setDescription(String description) {
		this.description = description;
	}

	public int getVideoId() {
		return videoId;
	}
	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}

	public String getContentType() {
		return contentType;
	}
	
	public void setContentType(String contentType) {
		this.contentType = contentType;
		
	}

	public String getPath() {
		return filePath;
	}
	
	public void setPath(String filePath) {
		this.filePath = filePath;
	}


	
}
