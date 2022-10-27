import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc): Promise<any> {
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions) {
    return await this.model.findById(id, option);
  }

  async findByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ) {
    return this.model.findOne(filter, field, option).populate(populate);
  }

  async findAll() {
    return await this.model.find();
  }

  async aggregate(option: any) {
    return await this.model.aggregate(option);
  }

  async populate(result: T[], option: any) {
    return await this.model.populate(result, option);
  }

  async deleteOne(id: string) {
    return await this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  async deleteMany(ids: string[]) {
    return await this.model.deleteMany({ _id: { $in: ids } } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update) {
    return await this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter, update, option?: any | null, callback?: any | null) {
    return await this.model.updateMany(filter, update, option, callback);
  }

  async findByIdAndUpdate(id, update) {
    return this.model.findByIdAndUpdate(id, update);
  }
}
