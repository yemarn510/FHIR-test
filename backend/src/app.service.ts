import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TokenSearch, TokenType } from './entity/token-search.entity';
import { Resource, ResourceType } from './entity/resource.entity';
import { StringSearch, StringType } from './entity/string-search.entity';
import { SearchService } from './services/search.service';
import { StringSearchService } from './services/string-search.service';
import { TokenSearchService } from './services/token-search.service';

@Injectable()
export class AppService {


  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,


    private searchService: SearchService,
    private stringSearchService: StringSearchService,
    private tokenSearchService: TokenSearchService,
  ) {}

  async getPatient(uuid: string): Promise<Resource | null> {
    const patient = await this.resourceRepository.findOne({
      where: { id: uuid },
    });
    return patient || null;
  }

  async createPatient(data: JSON): Promise<JSON> {
    const previousPatient = await this.resourceRepository.findOne({
      where: { raw: JSON.stringify(data) },
    });
    if (previousPatient) {
      await this.tokenSearchService.saveTokenSearch(data, previousPatient);
      await this.stringSearchService.saveStringSearch(data, previousPatient);
      return JSON.parse(previousPatient.raw);
    }

    const newResource = await this.resourceRepository.create({
      type: ResourceType.Patient,
      version: 1,
      alive: true,
      raw: JSON.stringify(data),
    });
    await this.resourceRepository.save(newResource);
    return JSON.parse(newResource.raw);
  }

  async searchPatient(params: { [key in string]: string }): Promise<Resource | null> {
    const keys = {};
    Object.keys(params).forEach(rawKeys => {
      const keyOnly = rawKeys.split(':')[0];
      keys[keyOnly] = rawKeys || '';
    });

    let token: TokenSearch | null = null;
    let stringSearch: StringSearch | null = null;

    for (let keyOnly of Object.keys(keys)) {
      switch (keyOnly) {
        case 'identifier':
          token = await this.searchService.getToken(TokenType.Identifier, params[keys[keyOnly]]);
          break;
        case 'gender':
          stringSearch = await this.searchService.getStrings(keys[keyOnly], params[keys[keyOnly]]);
          break;
        default:
          break;
      }
    };

    if (!token && !stringSearch) {
      return null;
    }

    const type = token?.type || stringSearch?.type;
    const typeID = token?.typeID || stringSearch?.typeID;

    const resource =  await this.resourceRepository.findOne({
      where: {
        type: type,
        id: typeID,
      }
    }) || null;
    return JSON.parse(resource?.raw || '');
  }
}
