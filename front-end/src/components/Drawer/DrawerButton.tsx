import { Button, SxProps, Typography } from "@mui/material";
import { Controller, FieldValues, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isEmpty, isTruthy } from "remeda";
import { Namespaces } from "../../i18n/i18n.constants";
import { RHF } from "../../utilities/RHFTypes";
import "./DrawerButton.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

type DrawerButtonProps<T extends FieldValues> = {
  placeholder: string;
  sx?: SxProps;
  disabled?: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & RHF<T>;

const DrawerButton = <T extends FieldValues>({
  placeholder,
  sx,
  isDrawerOpen,
  setIsDrawerOpen,
  control,
  name,
  disabled,
}: DrawerButtonProps<T>) => {
  const { t } = useTranslation(Namespaces.message);
  const watchedDrawerValue = useWatch({ control, name: name });

  const handleOnDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Button
            {...field}
            className="drawer-button"
            onClick={handleOnDrawerOpen}
            sx={{ ...sx }}
            value={watchedDrawerValue}
            disabled={disabled}
            endIcon={isDrawerOpen ? <ArrowDownward /> : <ArrowUpward />}
          >
            {!isEmpty(watchedDrawerValue) ? watchedDrawerValue : placeholder}
          </Button>
          {isTruthy(error) && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginTop: "4px", display: "block" }}
            >
              {t(error?.message ?? "")}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default DrawerButton;
