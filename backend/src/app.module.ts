import { StringSearchService } from './services/string-search.service';
import { SearchService } from './services/search.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configs/orm-configs.service';
import { Resource } from './entity/resource.entity';
import { TokenSearch } from './entity/token-search.entity';
import { StringSearch } from './entity/string-search.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfigService),
    TypeOrmModule.forFeature([Resource, TokenSearch, StringSearch]),
  ],
  controllers: [AppController],
  providers: [
        StringSearchService, 
        SearchService,
        AppService
  ],
})
export class AppModule {}
