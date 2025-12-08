import prisma from "@/lib/prisma";
import { SuggestionWithRelations } from "../types";

export async function createSuggestion(data: {
    title: string;
    description: string,
    authorId: string   
}) {
    return await prisma.suggestion.create({
        data: {
            title: data.title,
            description: data.description,
            authorId: data.authorId,
        },
    })
};

export async function getAllSuggestions(): Promise<SuggestionWithRelations[]> {
    const suggestions = await prisma.suggestion.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            author: {
                select: {
                    name: true
                },
            },
        },
    });

    return suggestions;
};

export async function getSuggestionById(id: string): Promise<SuggestionWithRelations | null>{
    return await prisma.suggestion.findUnique({
        where: { id },
        include: {
            votes: true,
            author: {
                select: {
                    name: true
                },
            },
        }
    })
}
