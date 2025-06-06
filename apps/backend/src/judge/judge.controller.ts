import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import {
  AssignAwardBody,
  CreateMainJudgeBody,
  CreateOtherJudgeBody,
  JudgeParams,
} from './dto/judge.dto';
import { ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JudgeService } from './judge.service';
import { ApiCommonResponses, ApiSummary } from 'src/common/common.decorator';

@Controller('judge')
@ApiCommonResponses()
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post('/main/:photoId')
  @HttpCode(201)
  @ApiSummary('Create a main judge for a photo, aka the final round')
  @ApiCreatedResponse({
    description: 'The judge has been added successfully',
  })
  @ApiNotFoundResponse({
    description: 'The photo not found',
  })
  async createMainJudge(
    @Param() { photoId }: JudgeParams,
    @Body() body: CreateMainJudgeBody,
  ) {
    try {
      const result = await this.judgeService.createMainJudge({
        photoId,
        ...body,
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('other/:photoId')
  @HttpCode(201)
  @ApiSummary(
    'Create a other judge for a photo, including category and comment',
  )
  async assignOtherCategory(
    @Param() { photoId }: JudgeParams,
    @Body() body: CreateOtherJudgeBody,
  ) {
    try {
      const result = await this.judgeService.createOtherJudge({
        photoId,
        ...body,
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('assign-award')
  @HttpCode(201)
  @ApiSummary('Assign an award/category to a photo')
  async assignAward(@Body() body: AssignAwardBody) {
    try {
      const result = await this.judgeService.assignAward(body);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
