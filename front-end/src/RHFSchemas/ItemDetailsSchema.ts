import { isTruthy } from "remeda";
import { z } from "zod";

const itemDetailsSchema = z.object({
  itemName: z
    .string()
    .refine((itemName) => isTruthy(itemName), { message: "requiredField" }),
  itemDescription: z.string().refine((description) => isTruthy(description), {
    message: "requiredField",
  }),
  itemLocation: z.string().refine((location) => isTruthy(location), {
    message: "requiredField",
  }),
  itemImage: z
    .string()
    .refine((image) => isTruthy(image), { message: "requiredField" }),
});

export type ItemDetailsSchema = z.infer<typeof itemDetailsSchema>;

export default itemDetailsSchema;
