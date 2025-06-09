import {
  Body,
  Controller,
  Get,
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
  OtherPhotoResultDto,
  RankingDto,
  ResultDto,
  SpecialAwardDto,
} from './dto/judge.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JudgeService } from './judge.service';
import { ApiCommonResponses, ApiSummary } from 'src/common/common.decorator';

@Controller('judge')
@ApiCommonResponses()
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Get('result')
  @HttpCode(200)
  @ApiSummary('Get the total score of all photos')
  @ApiOkResponse({
    description: 'The result',
    type: ResultDto,
  })
  async getTotalScore(): Promise<ResultDto> {
    try {
      return await this.judgeService.calculateResult();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('special-awards')
  @HttpCode(200)
  @ApiSummary('Get the special awards')
  @ApiOkResponse({
    description: 'The special awards',
    type: [SpecialAwardDto],
  })
  async getSpecialAwards(): Promise<SpecialAwardDto[]> {
    try {
      return await this.judgeService.getSpecialAwards();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('ranking')
  @HttpCode(200)
  @ApiSummary('Get the ranking')
  @ApiOkResponse({
    description: 'The ranking',
    type: [RankingDto],
  })
  async getRanking(): Promise<RankingDto[]> {
    try {
      return await this.judgeService.getRanking();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('other-photo-result')
  @HttpCode(200)
  @ApiSummary('Get the other photo result')
  @ApiOkResponse({
    description: 'The other photo result',
    type: OtherPhotoResultDto,
  })
  async getOtherPhotoResult(): Promise<OtherPhotoResultDto> {
    try {
      return await this.judgeService.getOtherPhotoResult();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

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
