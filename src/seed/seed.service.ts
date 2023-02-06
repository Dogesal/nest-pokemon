import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response.interface';
import { AxiosAdapter } from '../common/adapters/axios.adapter';


@Injectable()
export class SeedService {



  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosAdapter
  ){}

  async execute() {
    

    const pokemonInsert=[]

    const data =await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')
    
    data.results.forEach(({name,url}) => {

      const num = url.split('/')
      const no = +num[num.length-2]
      //const pokemon= await this.pokemonModel.create({name,no})
      pokemonInsert.push({name,no})

    });

    await this.pokemonModel.insertMany(pokemonInsert)

    return data.results;

  }

}
