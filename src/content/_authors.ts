import { z } from "astro:content";
import { authorSchema } from "../schemas/author";

export type Author = z.infer<typeof authorSchema>;
export const authors: Author[] = [
    {
        name: 'MC Poze do Rodo',
        avatar: {
            filePath: '/images/authors/user.webp',
            alt: 'Foto do MC Poze do Rodo usando uma corrente de ouro.'
        },
        socials: {
            website: 'https://www.youtube.com/channel/UCsyd_nnNNDxlOs9TYrDvCoQ'
        }
    },
    {
        name: 'MC Poze do Rodo1',
        socials: {
            website: 'https://www.youtube.com/channel/UCsyd_nnNNDxlOs9TYrDvCoQ'
        }
    }
];

z.array(authorSchema).superRefine((authors, ctx) => {
    const names = authors.map(author => author.name.trim());
    const duplicates = names.sort().filter((value, index, array) => array[index - 1] === value);

    if (duplicates.length > 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Não é permitido que múltiplos autores sejam registrados com o mesmo nome. [${[...new Set(duplicates)].join(', ')}]`
        })

        return z.NEVER;
    }
}).parse(authors);