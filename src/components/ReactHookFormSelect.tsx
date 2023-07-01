import React from "react";
import { Select, FormControl, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

interface ReactHookFormSelectProps {
  name: string;
  label: string;
  children: React.ReactNode;
  defaultValue: any;
  control: any;
  error: boolean;
  variant?: any;
  margin?: any;
  isMultiple?: boolean;
}

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  isMultiple,
  children,
  ...props
}: ReactHookFormSelectProps) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            {...field}
            labelId={labelId}
            label={label}
            defaultValue={defaultValue}
            multiple={isMultiple}>
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
