import { FC } from 'react'
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material'

export const Row: FC<{ name: string } & BoxProps> = ({ name, children, ...other }) => {
  return (
    <Box display="flex" alignItems="center" flex={1} {...other}>
      <Typography fontSize="18px" variant="body1" sx={{ mr: 2, color: "black", opacity: "0.6" }} fontWeight={400}>
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
