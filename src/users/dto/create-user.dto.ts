import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 30)
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;
}