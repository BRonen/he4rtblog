import { z } from "astro:content";
import { authors } from "../content/_authors";
import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH, MIN_TAGS, MAX_TAGS, MIN_TAG_LENGTH, MAX_TAG_LENGTH } from "./constants";
import { brazilianDateSchema } from "./date";
import { imageSchema } from "./image";

export const articleSchema = z.object({
  title: z.string()
    .min(MIN_TITLE_LENGTH, { message: `O título do artigo deve ter ao menos ${MIN_TITLE_LENGTH} caracteres` })
    .max(MAX_TITLE_LENGTH, { message: `O título do artigo deve ter no máximo ${MAX_TITLE_LENGTH} caracteres` }),
  description: z.string()
    .min(MIN_DESCRIPTION_LENGTH, { message: `A descrição do artigo deve ter ao menos ${MIN_DESCRIPTION_LENGTH} caracteres` })
    .max(MAX_DESCRIPTION_LENGTH, { message: `A descrição do artigo deve ter no máximo ${MAX_DESCRIPTION_LENGTH} caracteres` }),
  publishedAt: brazilianDateSchema,
  updatedAt: z.array(brazilianDateSchema).optional(),
  tags: z.array(z.string()
    .min(MIN_TAG_LENGTH, { message: `Tags devem ter no mínimo ${MIN_TAG_LENGTH} caracteres.` })
    .max(MAX_TAG_LENGTH, { message: `Tags devem ter no máximo ${MAX_TAG_LENGTH} caracteres.` })
    .refine((value) => value[0] != "#", { message: 'Tags não podem começar com uma hashtag ("#")' })
  )
    .min(MIN_TAGS, { message: `Você deve escolher no mínimo ${MIN_TAGS} tag` })
    .max(MAX_TAGS, { message: `Você deve escolher no máximo ${MAX_TAGS} tags` }),
  image: imageSchema.optional(),
  author: z.string().transform((authorName, ctx) => {
    const author = authors.find(author => author.name === authorName);

    if (!author) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Autor "${authorName}" não encontrado. Os autores atualmente registrados são: \n${authors.map(author => ` • ${author.name}`).join(';\n')}.\n` +
          'Caso o seu nome não esteja registrado, crie o seu perfil no arquivo "./src/content/_authors.ts"'
      });

      return z.NEVER;
    }

    return author;
  })
});