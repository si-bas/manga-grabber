import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigDatabaseInterface } from './interfaces/config-database.interface';
import { ConfigSourceInterface } from './interfaces/config-source.interface';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  private database: ConfigDatabaseInterface = {
    type: this.configService.get<string>('DB_CONNECTION'),
    host: this.configService.get<string>('DB_HOST'),
    port: this.configService.get<number>('DB_PORT'),
    database: this.configService.get<string>('DB_DATABASE'),
    username: this.configService.get<string>('DB_USERNAME'),
    password: this.configService.get<string>('DB_PASSWORD'),
    synchronize: true,
  };

  public sourceData: ConfigSourceInterface = {
    url: this.configService.get<string>('SOURCE_URL'),
    username: this.configService.get<string>('SOURCE_USERNAME'),
    password: this.configService.get<string>('SOURCE_PASSWORD'),
  };

  /**
   * name
   */
  public getDatabase(key: string): any {
    return this.database[key];
  }
}
