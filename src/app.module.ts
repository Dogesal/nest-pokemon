import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Mongoose } from 'mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AxiosAdapter } from './common/adapters/axios.adapter';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,  
    CommonModule,
    SeedModule,
    ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
