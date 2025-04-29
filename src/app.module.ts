import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    //MongooseModule.forRoot('mongodb+srv://sabri:Sab@cluster0.gmq3mhz.mongodb.net/nest?retryWrites=true&w=majority&appName=Cluster0'),
    
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
