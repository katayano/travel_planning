/**
 * Prisma Client Mock
 * https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
 */
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import { PrismaClient } from '@/generated/prisma'

import prisma from './prisma'

jest.mock('./prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>