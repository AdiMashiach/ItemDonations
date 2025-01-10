import { z } from "zod";
import { isTruthy } from "remeda";

const shipmentDetailsSchema = z.object({
  loadingCity: z.string().refine((loadingDest) => isTruthy(loadingDest), {
    message: "requiredField",
  }),
  loadingAddress: z.string().optional(),
  addressDetails: z.string().optional(),
});

export type ShipmentDetailsSchema = z.infer<typeof shipmentDetailsSchema>;

export default shipmentDetailsSchema;
