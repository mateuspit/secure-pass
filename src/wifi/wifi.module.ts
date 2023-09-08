import { Module } from '@nestjs/common';
import { WifiController } from './wifi.controller';
import { WifiService } from './wifi.service';
import { WifiRepository } from './wifi.repository';

@Module({
    controllers: [WifiController],
    providers: [WifiService, WifiRepository]
})
export class WifiModule { }
