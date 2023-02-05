import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { isValidObjectId, Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name=createPokemonDto.name.toLowerCase()
    try{
      const pokemon= await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    }catch(error ){
      this.handleExceptions(error)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {

  let pokemon:Pokemon

  if(!isNaN(+id)){
    pokemon = await this.pokemonModel.findOne({no:id})
  }

  if(!pokemon && isValidObjectId(id)){
    pokemon = await this.pokemonModel.findById(id)
  }
  if(!pokemon){
    pokemon = await this.pokemonModel.findOne({name:id.toLowerCase().trim()})
  }
  if(!pokemon){
    throw new NotFoundException(`Pokemon con id ${id} no existe`)
  }

    return pokemon
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    let pokemon:Pokemon
        pokemon = await this.findOne(id)

    if(updatePokemonDto.name){
      updatePokemonDto.name=updatePokemonDto.name.toLowerCase()
    }

    try{

      await pokemon.updateOne(updatePokemonDto)

      return {...pokemon.toJSON(),...updatePokemonDto}
    }catch(error ){
      this.handleExceptions(error)
    }

    
    
    
  }

  async remove(id: string) {

  
    //pokemon = await this.findOne(id)
    
    const {deletedCount,acknowledged} = await this.pokemonModel.deleteOne({_id:id})

    if(deletedCount==0)
      throw new BadRequestException(`no se encontro pokemon con esa id ${id} pa borrar`) 
    return "se elimino correctamente";
  }

  private handleExceptions(error:any){
    if(error.code==11000){
        throw new BadRequestException(`pokemon existe in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error)
      throw new  InternalServerErrorException(`Cant create pokemon`)
  }


}
