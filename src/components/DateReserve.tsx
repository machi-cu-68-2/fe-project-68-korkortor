"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateReserveProps {
  onDateChange: (date: string) => void;
  value: string;
}

export default function DateReserve({ onDateChange, value }: DateReserveProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value ? dayjs(value) : null}
        minDate={dayjs()}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            onDateChange(newValue.format("YYYY-MM-DD"));
          }
        }}
        sx={{
          width: "100%",
          marginBottom: "16px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#1a6b55",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1a6b55",
          },
        }}
      />
    </LocalizationProvider>
  );
}
