import { BrowserService } from './services/browser.service';
import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [BrowserService, AuthService],
  exports: [BrowserService, AuthService],
})
export class BrowserModule {}
