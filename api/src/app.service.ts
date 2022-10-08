import { Injectable } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { Prisma, Arquivo, NumerosTelefone } from "@prisma/client"

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

  validatePhone(CSV) {
      for (var i = 0; i < CSV.length; i++ ){
        var phone = CSV[i];

        if(phone.numero.toString().length === 11 && phone.numero.toString().charAt(2) === '9' && phone.mensagem.length < 160){
            phone.validez = true;
        } else{
            phone.validez = false;
        }
    }
    return CSV;
  }

  async createFileDate(data: string): Promise<Arquivo> {

    return this.prisma.arquivo.create({
        data: {NomeArquivo: data},
    });
  }

  async createManyMessages(data: Prisma.NumerosTelefoneCreateManyInput) {

    return this.prisma.numerosTelefone.createMany({
        data,
    });
}

}
