import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'
import * as cookieParser from 'cookie-parser'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)
	const port = config.get<number>('PORT') || 3000

	app.use(cookieParser())
	app.enableCors({ credentials: true, origin: true })

	app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		})
	)

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`)
	})
}
bootstrap()
