import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import * as os from "os";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${os.homedir()}/.desafio/database.sqlite`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
