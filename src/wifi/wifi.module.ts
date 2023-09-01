import { Module } from '@nestjs/common';
import { WifiController } from './wifi.controller';
import { WifiService } from './wifi.service';
import { WifiRepository } from './wifi.repository';
import { PrismaService } from "../prisma/prisma.service";

@Module({
    controllers: [WifiController],
    providers: [WifiService, WifiRepository, PrismaService]
})
export class WifiModule { }
