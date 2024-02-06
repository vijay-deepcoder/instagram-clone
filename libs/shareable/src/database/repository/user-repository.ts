import { DataSource, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { UserEntity } from '../entities/user.entity';
import { ApiException, ErrorCodes } from '@core/exception';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async isUniqueMail(email: string, id: number = 0) {
    const count = await this.count({
      where: {
        email,
        id: Not(id),
      },
    });
    if (count !== 0) {
      throw new ApiException(ErrorCodes.EmailTaken);
    }
  }

  async isUniqueUserName(username: string, id: number = 0) {
    const count = await this.count({
      where: {
        username,
        id: Not(id),
      },
    });
    if (count !== 0) {
      throw new ApiException(ErrorCodes.UsernameTaken);
    }
  }
  isEmailTaken(email: string): Promise<number> {
    return this.createQueryBuilder().where({ email }).getCount();
  }
}
