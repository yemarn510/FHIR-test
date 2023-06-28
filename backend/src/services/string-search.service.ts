/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource, ResourceType } from 'src/entity/resource.entity';
import { StringSearch, StringType } from 'src/entity/string-search.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StringSearchService {
  constructor(
    @InjectRepository(StringSearch)
    private stringRepository: Repository<StringSearch>,
  ) {}


  async saveStringSearch(data: JSON, previousPatient: Resource): Promise<void> {
    const genderValue = data['gender'] || null;
    const activeValue = data['active'] || null;

    if (!genderValue) {
      return;
    }
    
    const newStringSearch = {
      type: ResourceType.Patient,
      typeID: previousPatient.id,
      parameter: StringType.Gender,
      value: genderValue,
    }

    const previousStringSearch = await this.stringRepository.findOne({
      where: { ...newStringSearch }
    });

    if (!previousStringSearch) {
      const newString = await this.stringRepository.create(newStringSearch);
      await this.stringRepository.save(newString);
    }
  }
}
