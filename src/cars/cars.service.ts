import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.filter(car => car.id === id);
        if (car.length === 0) {
            throw new NotFoundException(`Car with id:${id} not found`);
        }
        return car[0];
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
        };
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Car with id:${updateCarDto.id} not valid`);
        }

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id };
                return carDB;
            }
            return car;
        });
        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
