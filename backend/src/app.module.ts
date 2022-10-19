import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () => ({
      type: 'mysql',
      host: "database",
      username: "user",
      password: "password",
      database: "db",
      port: 3306,
      autoLoadEntities: true,
      synchronize: true
    })
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
