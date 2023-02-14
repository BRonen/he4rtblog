import { z } from 'astro:content';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const brazilianDateSchema = z.string().transform((dateString, ctx) => {
  dayjs.extend(customParseFormat);
  const date = dayjs(dateString, "DD/MM/YYYY", true);

  if(!date.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_date,
      message: `A data "${dateString}" é inválida. Datas devem ser inseridas no formato DD/MM/YYYY.`
    });

    return z.NEVER;
  }

  return date.toDate();
});