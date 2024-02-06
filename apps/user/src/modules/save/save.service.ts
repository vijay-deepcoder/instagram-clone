import { Injectable } from '@nestjs/common';
import { PostSaveRepository } from '@shareable/database/repository';
import { UserEntity } from '@shareable/database/entities';
import { PostSaveUnSaveReqDto } from './dto/req/post-save-unsave-req.dto';

@Injectable()
export class SaveService {
  constructor(private readonly postSaveRepository: PostSaveRepository) {}

  async postSaveUnSave(user: UserEntity, body: PostSaveUnSaveReqDto) {
    const saved = await this.postSaveRepository.findOne({
      where: { userId: user.id, postId: body.id },
    });
    if (saved) {
      return await this.postSaveRepository.remove(saved);
    } else {
      return await this.postSaveRepository.save(
        this.postSaveRepository.create({
          userId: user.id,
          postId: body.id,
        }),
      );
    }
  }
}
