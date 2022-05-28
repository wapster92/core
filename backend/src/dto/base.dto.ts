import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
  @ApiProperty({description: 'Уникальный номер записи в базе данных'})
  id?: string
  @ApiProperty({description: 'Время создания записи'})
  createdAt?: string
  @ApiProperty({description: 'Время обновления записи'})
  updatedAt?: string
  @ApiProperty({description: 'Время удаления записи'})
  deletedAt?: string
}
