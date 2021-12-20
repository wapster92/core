import {BaseEntity} from "./base.entity";
import {Entity} from "typeorm";

export class RefreshTokensEntity extends BaseEntity {
  @Entity('refresh_tokens')
}
