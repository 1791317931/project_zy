package com.zy.action;

import java.io.File;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

public class UploadAction extends BaseAction {

	private static final long serialVersionUID = 288832652334614944L;

	private File file;
	private String fileFileName;
	private String fileContentType;
	
	public File getFile() {
		return file;
	}
	
	public void setFile(File file) {
		this.file = file;
	}
	
	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String upload() {
//		getText("user_image.path")
		
		String servletContextPath = ServletActionContext.getServletContext()
				.getRealPath("/");
		String filePath = getText("image_path");
		/*String src = uploadImage(servletContextPath, filePath,
				fileFileName, file);*/
		
		System.out.println(file + "--" + fileFileName + "--" + fileContentType);
		
		
		/*String form = fileFileName.substring(fileFileName.indexOf(".") - 1);
		Long time = (long) (new Date().getTime() + Math.random() * 1000);
		String imagePath = servletContextPath + filePath + time + form;*/
		/*if (ImageUtil.uploadImage(file, imagePath)) {
			return "/" + filePath + time + form;
		}*/
		return null;
	}
	
	/*public static boolean uploadImage(File file, String filePath) {
		boolean String = false;
		try {
			// 将客户端上传的图片保存到本地服务器
			FileUtils.copyFile(file, new File(filePath));
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	public String uploadImage(String servletContextPath, String filePath,
			String fileFileName, File file) {
		String form = fileFileName.substring(fileFileName.indexOf(".") - 1);
		Long time = (long) (new Date().getTime() + Math.random() * 1000);
		String imagePath = servletContextPath + filePath + time + form;
		if (uploadImage(file, imagePath)) {
			return "/" + filePath + time + form;
		}
		return null;
	}*/
	
}