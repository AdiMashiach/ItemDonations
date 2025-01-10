import { Control, FieldValues, Path } from "react-hook-form";

export type RHF<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};
