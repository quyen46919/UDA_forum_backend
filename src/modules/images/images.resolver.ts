import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Image } from '../../entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { ImageService } from './images.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
import { FileUpload } from 'graphql-upload';
import { ImageResponseType } from './dto/image-response.type';

@Resolver(() => Image)
export class ImageResolver {
  constructor(private readonly imagesService: ImageService) {}

  @Mutation(() => ImageResponseType, {
    description: 'Example upload single file',
  })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    { createReadStream, filename }: FileUpload,
    @Args('imageInfor') imageInfor: CreateImageInput,
  ): Promise<ImageResponseType> {
    return this.imagesService.saveFile(
      createReadStream,
      filename,
      imageInfor.alt,
      imageInfor.blurHash,
      imageInfor.description,
      imageInfor.createUserId,
      imageInfor.urlLink,
    );
  }

  //   @Mutation(() => Boolean, { description: 'Example upload multi image' })
  //   async uploadMulti(
  //     @Args({ name: 'files', type: () => [GraphQLUpload], nullable: true })
  //     files?: Promise<FileUpload>[],
  //   ): Promise<boolean> {
  //     files.map(async (file: Promise<FileUpload>) => {
  //       const { filename, createReadStream } = await file;
  //       const d = new Date();
  //       const basename = filename.split('.')[0];
  //       const suffix =
  //         strftime('%y%m%d_%H%M%S', d) +
  //         d.getMilliseconds() +
  //         '.' +
  //         filename.split('.')[1];
  //       const filePath = path.join(
  //         __dirname,
  //         '../../../../uploads',
  //         basename + '_' + suffix,
  //       );
  //       createReadStream().pipe(createWriteStream(filePath));
  //     });
  //     return true;
  //   }

  @Mutation(() => Image, { description: 'Save file path' })
  createFile(@Args('createFileInput') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'files' })
  findAll() {
    return this.imagesService.findAll();
  }

  @Query(() => Image, { name: 'file' })
  findOne(@Args('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image, { description: 'Update file path' })
  updateFile(@Args('updateFileInput') updateImageInput: UpdateImageInput) {
    return this.imagesService.update(updateImageInput.id, updateImageInput);
  }

  @Mutation(() => Image, { description: 'Delete file' })
  removeFile(@Args('id') id: string) {
    return this.imagesService.remove(id);
  }
}
