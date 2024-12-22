package com.stream.app.spring_stream_backend.services.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;


import com.stream.app.spring_stream_backend.entities.Video;
import com.stream.app.spring_stream_backend.repositories.VideoRepository;
import com.stream.app.spring_stream_backend.services.VideoService;

import jakarta.annotation.PostConstruct;

import java.nio.file.Files;
import java.nio.file.Path;


@Service
public class VideoServiceImpl implements VideoService {

	@Value("${files.video}")
	String DIR;
	
	private VideoRepository videoRepository;
	
	@Autowired
	public VideoServiceImpl(VideoRepository videoRepository) {
		this.videoRepository = videoRepository;
	}
	
	@PostConstruct
	public void init() {  // this method will run as soon as the bean is created

		File file = new File(DIR);
		if(!file.exists()) {
			file.mkdir();
			System.out.println("Folder created");
		}
		else {
			System.out.println("Folder already created");
		}
	}
	
	@Override
	public Video save(Video video, MultipartFile file) {

		try {
			// original filename
			String filename = file.getOriginalFilename();
			String contentType = file.getContentType();
			InputStream inputStream = file.getInputStream();
			

			// file path
			String cleanFileName = StringUtils.cleanPath(filename);
			
			// folder path
			String cleanFolder = StringUtils.cleanPath(DIR);
			
			// folder path with filename
			Path path = Paths.get(cleanFolder, cleanFileName);
			System.out.println("1."+path);
			System.out.println("2."+contentType);
			
			
			// copy file to the folder
			Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
			
			// video meta data
			video.setContentType(contentType);
			video.setPath(path.toString());
			
			// metadata save
			Video savedVideo = videoRepository.save(video);
			return savedVideo;
//			return null;
			
		}catch(IOException e) {
			e.printStackTrace();
			return null;
		}
		
		
	}

	@Override
	public Video get(int videoId) {
		Video video = videoRepository.findById(videoId).orElseThrow(() -> new RuntimeException("video not found"));
		return video;
	}

	@Override
	public Video getByTitle(String title) {

		return null;
	}

	@Override
	public List<Video> getAll() {
		return videoRepository.findAll();
	}

}
