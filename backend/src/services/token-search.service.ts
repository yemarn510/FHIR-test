import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource, ResourceType } from 'src/entity/resource.entity';
import { TokenSearch, TokenType } from 'src/entity/token-search.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenSearchService {
  constructor(
    @InjectRepository(TokenSearch)
    private tokenRepository: Repository<TokenSearch>,
    
  ) {}


  async saveTokenSearch(data: JSON, previousPatient: Resource): Promise<void> {
    for (let eachToken of data['identifier']) {
      const newTokenValues = {
        type: ResourceType.Patient,
        typeID: previousPatient.id,
        parameter: TokenType.Identifier,
        system: eachToken['system'],
        code: eachToken['value'],
      }
      const previousToken = await this.tokenRepository.findOne({
        where: { ...newTokenValues }
      });

      if (!previousToken) {
        const newToken = await this.tokenRepository.create(newTokenValues);
        await this.tokenRepository.save(newToken);
      }
    }
  }
}
