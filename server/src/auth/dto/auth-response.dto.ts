import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: '60d5ecf4f7b3b3001c8e4d7a', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'User username' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;
}

