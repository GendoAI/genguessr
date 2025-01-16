import {
  Controller,
  Get,
  HttpRedirectResponse,
  Redirect,
} from '@nestjs/common';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

@Controller('game')
export class GameController {
  @Get('new')
  @Redirect()
  async getNew() {
    const gameId = Array.from({ length: 8 }).map(randomChar).join('');
    return {
      url: `http://localhost:3000/game?id=${gameId}`,
      statusCode: 302,
    } as HttpRedirectResponse;
  }
}
