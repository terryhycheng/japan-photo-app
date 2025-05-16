import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { JudgeMainBody, JudgeParams } from './dto/judge.dto';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JudgeService } from './judge.service';
import { NotFoundError } from 'src/common/common.error';

@Controller('/api/judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post('/main/:photoId')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The judge has been added successfully',
  })
  @ApiNotFoundResponse({
    description: 'The photo not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'The server error',
  })
  async createMainJudge(
    @Param() params: JudgeParams,
    @Body() body: JudgeMainBody,
  ) {
    try {
      const result = await this.judgeService.createMainJudge({
        id: params.photoId,
        ...body,
      });

      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
