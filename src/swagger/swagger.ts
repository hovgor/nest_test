import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest_Test')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
}
