/* eslint-disable prettier/prettier */
/* Body previously imported in common nestjs */
import { Controller, Get, StreamableFile } from '@nestjs/common';
import { Post, Response } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

let documentsFromCSV;
let fileName;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('csv_upload')
  async getCSVfile(@Response() res){
    documentsFromCSV = res.locals.csv

    fileName = res.locals.file

    documentsFromCSV = this.appService.validatePhone(documentsFromCSV)

/*     return console.log("CSV Uploaded!"); */

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

  @Get('model_download')
  async downloadCSVfile(@Response({ passthrough: true }) res) : Promise<StreamableFile> {
    const csvModel = createReadStream(join(process.cwd(), "campanha01.csv"));
    res.set({
        'Content-Type': 'application/csv',
        'Content-Disposition': 'attachment; filename="campanha01.csv"',
    });
    return new StreamableFile(csvModel)
  }
}