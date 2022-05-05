import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarbonModule } from './carbon/carbon.module';
import { Carbon } from './carbon/entities/carbon.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

const databaseConfigProvider = {
  getTypeORMConfig: (): {} => {
    return {
      type: "better-sqlite3",
      database: "dev.db",
      entities: [Carbon, User],
      synchronize: true,
    };
  }
}

@Module({
  imports: [CarbonModule, TypeOrmModule.forRoot(databaseConfigProvider.getTypeORMConfig()), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
