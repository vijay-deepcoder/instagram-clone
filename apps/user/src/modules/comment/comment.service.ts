import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/req/create-comment.dto';
import { UserEntity } from '@shareable/database/entities';
import { CommentRepository } from '@shareable/database/repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(user: UserEntity, body: CreateCommentDto) {
    return this.commentRepository.save(
      this.commentRepository.create({
        ...body,
        authorId: user.id,
      }),
    );
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOneOrFail({
      where: { id },
    });
    return await this.commentRepository.remove(comment);
  }
}
