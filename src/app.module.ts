import { MangaModule } from './manga/manga.module';
import { AppConfigModule } from './config/app-config.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    MangaModule,
    AppConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => ({
        type: appConfigService.getDatabase('type'),
        host: appConfigService.getDatabase('host'),
        port: appConfigService.getDatabase('port'),
        username: appConfigService.getDatabase('username'),
        password: appConfigService.getDatabase('password'),
        database: appConfigService.getDatabase('database'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: appConfigService.getDatabase('synchronize'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
