import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  phoneNumber: string;
}
