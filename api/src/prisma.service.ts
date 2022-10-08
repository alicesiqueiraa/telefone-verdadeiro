import { Injectable } from "@nestjs/common";
import { OnModuleInit, INestApplication } from "@nestjs/common/interfaces";
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
}