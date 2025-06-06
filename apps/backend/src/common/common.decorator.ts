import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

export const ApiCommonResponses = () =>
  applyDecorators(
    ApiTooManyRequestsResponse({
      description: 'Too many requests',
    }),
    ApiInternalServerErrorResponse({
      description: 'The server error',
    }),
  );

export const ApiSummary = (summary: string) =>
  applyDecorators(ApiOperation({ summary }));
