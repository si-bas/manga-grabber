import { HttpService, Injectable } from '@nestjs/common';
import { AuthService } from 'src/browser/services/auth.service';
import { BrowserService } from 'src/browser/services/browser.service';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { MangaRepository } from '../repositories/manga.repository';

@Injectable()
export class MangaService {
  constructor(
    private readonly authService: AuthService,
    private readonly browserService: BrowserService,
    private readonly httpService: HttpService,
    private readonly mangaRepository: MangaRepository,
  ) {}

  /**
   * Sync follows manga
   */
  public async followsSync(): Promise<{ title: string; id: number }[]> {
    await this.authService.login();
    const baseUrl = this.browserService.baseUrl;

    const browser = await this.browserService.getWindow();
    const page = await browser.newPage();

    const mangas: { title: string; id: number }[] = [];

    try {
      for (let index = 1; index > 0; index++) {
        await page.goto(`${baseUrl}/follows/manga/0/0/${index}/`, {
          waitUntil: 'networkidle0',
        });

        if ((await page.$('.alert.alert-warning.text-center')) !== null) break;

        const content = await page.$eval(
          '#chapters',
          element => element.innerHTML,
        );

        const $ = cheerio.load(content);
        _.forEach($('a.ml-1.manga_title.text-truncate'), value => {
          const { title, href } = value.attribs;

          mangas.push({
            title,
            id: Number(href.split('/')[2]),
          });
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }

    mangas.forEach(element => {
      this.mangaRepository.upsert(element);
    });

    return mangas;
  }

  /**
   * Sync manga with API
   */
  public async sync(id: number): Promise<void> {
    const baseUrl = this.browserService.baseUrl;

    this.httpService
      .get(`${baseUrl}/api/`, {
        params: {
          id,
          type: 'manga',
        },
      })
      .subscribe(response => {
        console.log(response.data);
      });
  }
}
