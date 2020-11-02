import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app-config.service';
import * as puppeteer from 'puppeteer-core';

@Injectable()
export class BrowserService {
  constructor(private readonly appConfigService: AppConfigService) {}

  public baseUrl: string = this.appConfigService.sourceData.url;
  public viewport = { width: 1366, height: 768 };
  /**
   * Get a new window
   */
  public async getWindow(): Promise<any> {
    const launchOptions = this.appConfigService.browserOptions;
    const browser = await puppeteer.launch(launchOptions);

    return browser;
  }
}
