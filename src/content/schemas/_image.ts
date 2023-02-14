import { z } from 'astro:content';
import { IMAGE_FORMATS } from './_constants';
import fs from 'fs';

export const imageSchema = z.object({
  filePath: z.string()
    .superRefine((filePath, ctx) => {
      if(!IMAGE_FORMATS.some(format => filePath.endsWith(format))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `O formato da imagem "${filePath}" é inválido. Apenas os seguintes formatos são permitidos: "${IMAGE_FORMATS.join(', ')}"`
        });

        return z.NEVER;
      }

      if(!fs.existsSync('./public' + filePath)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `A imagem "${filePath}" não foi encontrada.\n` + 
          'Imagens devem ser armazenadas no diretório "./public", e ele deve ser omitido ao escrever o caminho para a imagem. Exemplo: Para utilizar uma imagem armazenada no diretório "./public/authors/image.webp", o caminho especificado deve ser apenas "/authors/image.webp".'
        });

        return z.NEVER;
      }
    }),
  alt: z.string()
});