import { PrismaClient } from "@prisma/client"
import {NoteInput} from "./types";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'],
})

const resolvers = {
    Query : {
        async allNotes(){
            return await prisma.notes.findMany();
        },
        async findNoteById(id: number) {
            return await prisma.notes.findFirst({where: {id}})
        }
    },
    Mutation: {
        async createNote(root: any, input: NoteInput) {
            return await prisma.notes.create({data: {title: input.title, content: input.content,
                                                     createdAt: new Date(), updatedAt: new Date()}
            });
        },
        async updateNote(root: any, input: NoteInput) {
            return await prisma.notes.update({where: {id: input.id},
                                              data: {title: input.title, content: input.content, updatedAt: new Date()}
            });
        },
    }
};

export { resolvers }