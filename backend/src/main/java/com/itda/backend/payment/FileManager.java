package com.itda.backend.payment;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Calendar;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

@Service("fileManager")
public class FileManager {

	// 파일 업로드
	public static String doFileUpload(InputStream is, String originalFileName, String path) throws Exception {

		String newFileName = "";

		if (is == null) {
			return null;
		}

		if (originalFileName.equals("")) {

			return null;
		}

		// abc.txt
		// 1234567

		String fileExt = originalFileName.substring(originalFileName.lastIndexOf("."));

		if (fileExt == null || fileExt.equals("")) {
			return null;
		}

		// 서버에 저장할 새로운 파일명을 생성
		newFileName = String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS", Calendar.getInstance());

		newFileName += System.nanoTime();
		newFileName += fileExt;

		File f = new File(path);

		if (!f.exists()) {
			f.mkdirs();
		}

		String fullFilePath = path + File.separator + newFileName;

		// spring 파일 업로드 핵심

		FileCopyUtils.copy(is, new FileOutputStream(fullFilePath));

		return newFileName;
	}

	public static boolean doFileDownload(HttpServletResponse response, String saveFileName, String originalFileName,
			String path) {

		try {

			String filePath = path + File.separator + saveFileName;

			// 파일을 다운받을 때 한글 이름 깨짐 방지
			originalFileName = new String(originalFileName.getBytes("euc-kr"), "ISO-8859-1");

			File f = new File(filePath);

			if (!f.exists()) { // 파일 없으면 건너뛴다.
				return false;
			}

			response.setContentType("application/octet-stream");
			response.setHeader("Content-disposition", "attachment;fileName=" + originalFileName);

			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(f));

			OutputStream out = response.getOutputStream();

			int data;
			byte buffer[] = new byte[4096];
			while ((data = bis.read(buffer, 0, 4096)) != -1) {
				out.write(buffer, 0, data);
			}

			out.flush();
			out.close();
			bis.close();

		} catch (Exception e) {
			System.out.println(e.toString());
			return false;
		}

		return true;
	}

	public static void doFileDelete(String fileName, String path) {

		try {

			String filePath = path + File.separator + fileName;

			File f = new File(filePath);

			if (f.exists()) {
				f.delete(); // 물리적 파일 삭제
			}

		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}

}