import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/browser/services/auth.service';
import { BrowserService } from 'src/browser/services/browser.service';
import * as cheerio from 'cheerio';
import * as _ from 'lodash';
import { GenreRepository } from '../repositories/genre.repository';

@Injectable()
export class GenreService {
  constructor(
    private readonly authService: AuthService,
    private readonly browserService: BrowserService,
    private readonly genreRepository: GenreRepository,
  ) {}

  /**
   * Scrap and sync genre
   */
  public async sync(): Promise<any> {
    await this.authService.login();
    const baseUrl = this.browserService.baseUrl;

    const browser = await this.browserService.getWindow();
    const page = await browser.newPage();

    await page.goto(`${baseUrl}/manga_new`, {
      waitUntil: 'networkidle0',
    });

    const genres = [];

    try {
      const form = await page.$eval(
        '#manga_add_form',
        element => element.innerHTML,
      );

      const $ = cheerio.load(form);
      _.forEach($(`[id*='checkbox-tag-']`), value => {
        const id = value.attribs.value;
        const title = $(
          `label[for='checkbox-tag-${value.attribs.value}']`,
        ).text();

        genres.push({
          id,
          title,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      browser.close();
    }

    genres.forEach(element => {
      this.genreRepository.upsert(element);
    });

    return genres;
  }
}
