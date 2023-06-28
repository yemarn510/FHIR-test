import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringSearch, StringType } from 'src/entity/string-search.entity';
import { TokenSearch, TokenType } from 'src/entity/token-search.entity';
import { Repository, Not } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(TokenSearch)
    private tokenRepository: Repository<TokenSearch>,
    @InjectRepository(StringSearch)
    private stringRepository: Repository<StringSearch>,
  ) {}

  async getToken(type: TokenType, value: string): Promise<TokenSearch | null> {
    const [system, code] = value.split('|');

    return await this.tokenRepository.findOne({
      where: { system, code, parameter: type }
    });
  }

  async getStrings(type: string, value: string): Promise<StringSearch | null> {
    const [field, extra] = type.split(':');

    return await this.stringRepository.findOne({
      where: { parameter: StringType[field], value: extra === 'not' ? Not(value) : value }
    });
  }
}
