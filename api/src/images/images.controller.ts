import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('images')
export class ImagesController {
  constructor(private readonly httpService: HttpService) {}

  @Post('generate')
  async post(@Body() payload: any) {
    const generationTaskId = await this.createGenerationTask(payload.prompt);
    return { id: generationTaskId, status: 'waiting' };
  }

  @Get('result/:id')
  async getResult(@Param('id') id: string) {
    const generationTask = await this.fetchGenerationTask(id);

    const resultDto = { id, status: 'waiting', image_url: undefined };

    if (generationTask.faulted) {
      resultDto.status = 'error';
      return resultDto;
    }

    if (generationTask.finished && generationTask.generations.length === 1) {
      resultDto.status = 'completed';
      resultDto.image_url = generationTask.generations[0].img;
      return resultDto;
    }

    if (generationTask.processing) {
      resultDto.status = 'processing';
      return resultDto;
    }

    if (generationTask.waiting) return resultDto;

    return resultDto;
  }

  private async fetchGenerationTask(generationId: string) {
    const response = await this.httpService.axiosRef.get(
      `https://stablehorde.net/api/v2/generate/status/${generationId}`,
      {
        headers: {
          apikey: '0000000000',
          'Client-Agent': 'unknown:0:unknown',
        },
      },
    );

    return response.data;
  }

  private async createGenerationTask(prompt: string) {
    const payload = {
      params: {
        sampler_name: 'k_dpm_2_a',
        cfg_scale: 7.5,
        denoising_strength: 0.75,
        seed: Math.floor(Math.random() * 1_000_000).toString(),
        height: 512,
        width: 512,
        seed_variation: 1,
        post_processing: ['GFPGAN'],
        karras: false,
        tiling: false,
        hires_fix: false,
        clip_skip: 1,
        steps: 20,
        n: 1,
      },
      nsfw: false,
      censor_nsfw: true,
      disable_batching: false,
      prompt,
    };

    const response = await this.httpService.axiosRef.post(
      `https://stablehorde.net/api/v2/generate/async`,
      payload,
      {
        headers: {
          apikey: '0000000000',
          'Client-Agent': 'unknown:0:unknown',
        },
      },
    );

    return response?.data.id as string;
  }
}
