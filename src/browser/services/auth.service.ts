import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app-config.service';
import { BrowserService } from './browser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly browserService: BrowserService,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Login
   */
  public async login(): Promise<void> {
    const { url, username, password } = this.appConfigService.sourceData;

    const browser = await this.browserService.getWindow();
    const page = await browser.newPage();

    try {
      await page.goto(`${url}/login`, {
        waitUntil: 'networkidle0',
      });

      if ((await page.$('#login_username')) !== null) {
        await page.type('#login_username', username);
        await page.type('#login_password', password);

        await Promise.all([
          page.click('#login_button'),
          page.waitForNavigation({
            waitUntil: 'networkidle0',
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
  }
}
