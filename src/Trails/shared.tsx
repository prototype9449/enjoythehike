import { FC } from 'react'
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material'

export const Row: FC<{ name: string,labelMr?: number } & BoxProps> = ({ name, children, labelMr = 1.5, ...other }) => {
  return (
    <Box display="flex" alignItems="baseline" flex={1} {...other}>
      <Typography fontSize="18px" variant="body1" sx={{ mr: labelMr, color: "black", opacity: "0.6" }} fontWeight={400}>
        {name}:
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export const ValuePart = ({ children, ...other }: TypographyProps) => {
  return (
    <Typography component="span" fontSize="18px" fontWeight="400" variant={"body1"} {...other}>
      {children}
    </Typography>
  );
};
