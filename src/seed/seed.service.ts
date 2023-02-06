import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interface/poke-response.interface';


@Injectable()
export class SeedService {

  async execute() {


    const {data} =await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    data.results.forEach(({name,url}) => {

      let num = url.split('/')
      const no = +num[num.length-2]

    });

    return data.results;

  }

}
