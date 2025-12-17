import prisma from "@/lib/prisma";
import { UserWithRelations, UserWithStats } from "@/lib/types";
import { User } from "@prisma/client";

export async function getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { id }
    })
};

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email }
    })
};

export async function getUserProfile(id: string): Promise<UserWithRelations | null> {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            suggestions: {
                orderBy: { createdAt: 'desc' }
            },
            votes: true
        }
    });
};

export async function getUserStats(id: string): Promise<UserWithStats | null> {
    return await prisma.user.findUnique({
        where: { id },
        include: {
            _count: {
                select: { suggestions: true, votes: true }
            }
        }
    });
};

export async function deleteUser(id: string): Promise<User | null> {
    return await prisma.user.delete({
        where: { id }
    });
}

