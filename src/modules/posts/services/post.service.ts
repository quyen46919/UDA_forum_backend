import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  getAllPosts() {
    return this.postRepository.findAll();
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);
    if (post) {
      return post;
    } else {
      throw new PostNotFoundException(id);
      // throw new NotFoundException(id);
    }
  }
  createPost(post: CreatePostDto) {
    return this.postRepository.create(post);
  }
  replacePost(id: string, post: UpdatePostDto) {
    return this.postRepository.findByIdAndUpdate(id, post);
  }
  deletePost(id: string) {
    return this.postRepository.deleteOne(id);
  }
}
