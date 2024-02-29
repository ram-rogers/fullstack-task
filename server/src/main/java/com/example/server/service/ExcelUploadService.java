package com.example.server.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import com.example.server.entity.UserEntity;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class ExcelUploadService {
    public static boolean isValidExcelFile(MultipartFile file){
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" );
    }
   public static List<UserEntity> getCustomersDataFromExcel(InputStream inputStream){
        List<UserEntity> customers = new ArrayList<>();
       try {
           XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
           XSSFSheet sheet = workbook.getSheet("users");
           int rowIndex =0;
           for (Row row : sheet){
               if (rowIndex ==0){
                   rowIndex++;
                   continue;
               }
               Iterator<Cell> cellIterator = row.iterator();
               int cellIndex = 0;
               UserEntity user = new UserEntity();
               while (cellIterator.hasNext()){
                   Cell cell = cellIterator.next();
                   switch (cellIndex){
                       case 0 -> user.setId((int) cell.getNumericCellValue());
                       case 1 -> user.setAssociateId(cell.getStringCellValue());
                       case 2 -> user.setName(cell.getStringCellValue());
                       case 3 -> user.setEmail(cell.getStringCellValue());
                       case 4 -> user.setPassword(cell.getStringCellValue());
                       case 5 -> user.setIsRegistered((int) cell.getNumericCellValue());
                       case 6 -> user.setEmailVerified((int) cell.getNumericCellValue());
                       case 7 -> user.setForgotPassword((int) cell.getNumericCellValue());
                       default -> {
                       } 
                   }
                   cellIndex++;
               }  
               customers.add(user);
           }
       } catch (IOException e) {
           e.getStackTrace();
       }
       return customers;
   }

}
