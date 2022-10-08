import { Controller, Get, Body } from '@nestjs/common';
import { Post, Response } from '@nestjs/common/decorators';
import { AppService } from './app.service';

let documentsFromCSV;
let fileName

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('csv_upload')
  async getCSVfile(@Response() res){
    documentsFromCSV = res.locals.csv

    fileName = res.locals.file

    documentsFromCSV = this.appService.validatePhone(documentsFromCSV)

    return console.log("CSV Uploaded!");

  }

  @Get('uploads/payload')
  async sendPayload(){

    return documentsFromCSV

  }

  @Get('db_upload')
  async uploadDb(){

    this.appService.createFileDate(fileName);

    this.appService.createManyMessages(documentsFromCSV);

  } 
}