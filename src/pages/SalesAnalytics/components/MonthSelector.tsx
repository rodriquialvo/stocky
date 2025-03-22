import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Month } from '../SalesAnalytics.controller';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  months: Month[];
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
  months
}) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Mes</InputLabel>
      <Select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        label="Mes"
      >
        {months.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}; 