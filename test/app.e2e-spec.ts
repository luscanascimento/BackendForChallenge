import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { TasksService } from '../src/tasks/tasks.service';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(TasksService)
      .useValue(TasksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Tasks esta rodando');
  });
});
