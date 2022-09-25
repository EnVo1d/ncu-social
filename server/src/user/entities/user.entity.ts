import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Role, Status } from '@prisma/client'

@ObjectType()
export class User {
	@Field(() => ID)
	id: string

	@Field(() => String)
	username: string

	@Field(() => String)
	email: string

	@Field(() => String)
	isVerified: boolean

	@Field(() => String)
	passwordHash: string

	@Field(() => String)
	firstName: string

	@Field(() => String)
	lastName: string

	@Field(() => String, { nullable: true })
	country?: string

	@Field(() => String)
	role: Role

	@Field(() => String)
	status: Status

	@Field(() => String, { nullable: true })
	avatarUrl?: string

	@Field(() => String, { nullable: true })
	gender?: string

	@Field(() => Date, { name: 'registeredAt' })
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
