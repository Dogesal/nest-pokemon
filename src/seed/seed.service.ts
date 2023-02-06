import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interface/poke-response.interface';


@Injectable()
export class SeedService {

  async execute() {


    const {data} =await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    return data.results;

  }

}
