import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Image } from '../../entities/image.entity';
import { createWriteStream } from 'fs';
import path = require('path');
import { ImageResponseType } from './dto/image-response.type';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private fileRepository: Repository<Image>,
  ) {}

  saveFile(
    createReadStream: any,
    filename: string,
    alt: string,
    blurHash: string,
    description: string,
    createUserId: string,
    urlLink: string,
  ): Promise<ImageResponseType> {
    const basename = filename;

    const filePath = path.join(`${process.env.UPLOAD_PATH}`, basename);

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', async () => {
          const image = await this.create({
            name: basename,
            alt,
            createUserId,
            urlLink,
            description,
            blurHash,
          });
          return resolve({
            name: basename,
            uploadFile: true,
            image: image,
          });
        })
        .on('error', () => {
          return reject({
            name: '',
            uploadFile: false,
            image: {
              name: '',
            },
          });
        }),
    );
  }

  create(createImageInput: CreateImageInput) {
    const newFile = this.fileRepository.create(createImageInput);

    return this.fileRepository.save(newFile);
  }

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: string) {
    return this.fileRepository.findOneOrFail(id);
  }

  update(id: string, updateImageInput: UpdateImageInput) {
    return this.fileRepository.update(id, updateImageInput);
  }

  remove(id: string) {
    return this.fileRepository.delete(id);
  }
}
