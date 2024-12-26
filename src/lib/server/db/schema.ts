import type { AttachmentUploadRequestType } from '$lib/types/AttachmentUploadRequest';
import { pgTable, char, serial, text, integer, uuid, customType, timestamp, real } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { ExpenseType } from '$lib/types/ExpenseType';

const hexString = customType<{
	data: string,
	default: false,
}>({

	dataType() {
		return 'bytea'
	},
	toDriver(value) {
		return Buffer.from(value, 'hex')
	},
	fromDriver(value: Buffer) {
		return value.toString('hex')
	},
})

export const users = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
});

export const claims = pgTable('claims', {
	id: uuid('id').defaultRandom().primaryKey(),
	description: text('description'),

	author: uuid('author').notNull().references(() => users.id),
	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow()
});

export const expenses = pgTable('expenses', {
	id: uuid('id').defaultRandom().primaryKey(),
	claimId: uuid('claimId').notNull().references(() => claims.id),

	supplier: text('supplier').notNull(),
	description: text('description').notNull(),
	category: text('category').notNull(),

	cost: real('cost').notNull(),
	gst: real('gst'),

	created: timestamp('created').defaultNow(),
	updated: timestamp('updated').defaultNow()
} satisfies
	{ [key in keyof ExpenseType]: any }
	& { id: any, claimId: any }
	& { created: any, updated: any }
);

export const attachments = pgTable('attachments', {
	id: uuid('id').defaultRandom().primaryKey(),
	filename: text('filename').notNull(),

	size: integer('size').notNull(),

	hash: hexString('hash').notNull(),
	bytes: hexString('bytes').notNull(),

	author: uuid('author').notNull().references(() => users.id),
	time: timestamp('time').defaultNow()
} satisfies
	{ [key in keyof AttachmentUploadRequestType]: any; }
	& { id: any, bytes: any }
	& { author: any, time: any }
)


// FIXME: USE REDIS OR DRAGONFLY https://www.dragonflydb.io/
export const attachmentRequests = pgTable('attachmentRequests', {
	id: uuid('id').defaultRandom().primaryKey(),
	filename: text('filename').notNull(),

	size: integer('size').notNull(),

	hash: hexString('hash').notNull(),

	author: uuid('author').notNull().references(() => users.id),
	time: timestamp('time').defaultNow()
} satisfies
	{ [key in keyof AttachmentUploadRequestType]: any; }
	& { id: any }
	& { author: any, time: any }
)
//


export const usersRelations = relations(users, ({ many }) => ({
	claims: many(claims),
}));


export const claimsRelations = relations(claims, ({ many }) => ({
	expenses: many(expenses),
}));



