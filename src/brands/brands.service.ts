import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [];

  findAll() {
    return this.brands;
  }

  findOneById(id: string) {
    const brand = this.brands.filter(brand => brand.id === id);
    if (brand.length === 0) {
      throw new NotFoundException(`Brand with id:${id} not found`);
    }
    return brand[0];
  }

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    };

    this.brands.push(brand);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOneById(id);

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto, id };
        return brandDB;
      }
      return brand;
    });
    return brandDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
