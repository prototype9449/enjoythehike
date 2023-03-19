import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Rating, Typography, TypographyProps } from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { FC, SyntheticEvent, useState } from "react";
import { TrailLevel } from "../BookingForm/types";
import { ReactSVG } from "react-svg";

export type Trail = {
  name: string;
  distance: number;
  climb: number;
  rank: number;
  ratio: number;
  level: TrailLevel;
  image: string;
  priceMax: number;
  priceMin: number;
  hours: number;
};
const trails: Trail[] = [
  {
    name: "Atalanti Nature Troodos",
    climb: 133,
    ratio: 4.7,
    distance: 13.92,
    level: "hard",
    rank: 85,
    image: "/atalanti.jpeg",
    priceMax: 140,
    priceMin: 90,
    hours: 9,
  },
];

const Row: FC<{ name: string; children: any }> = ({ name, children }) => {
  return (
    <Box display="flex" alignItems="center" flex={1}>
      <Typography fontSize="18px" variant="body1" sx={{ mr: 2, color: "black", opacity: "0.6" }} fontWeight={400}>
        {name}:
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

const ValuePart = ({ children, ...other }: TypographyProps) => {
  return (
    <Typography component="span" fontSize="18px" fontWeight="400" variant={"body1"} {...other}>
      {children}
    </Typography>
  );
};

const Level = ({ level }: { level: TrailLevel }) => {
  const fill = level === "low" ? "green" : level === "medium" ? "yellow" : "red";

  return (
    <Box mb={1} ml={2}>
      <ReactSVG
        beforeInjection={(svg) => {
          svg.setAttribute("style", `size: 26px`);
          svg.setAttribute("style", `fill: ${fill}`);
        }}
        src={`level-${level}.svg`}
      />
    </Box>
  );
};

export const Trails = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const trailComps = trails.map(({ name, hours, level, rank, climb, ratio, image, distance, priceMax, priceMin }) => {
    return (
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Box display="flex" justifyContent="space-between" width="100%">
            <img src={image} height="120px" alt={name} />
            <Box ml={5} flex={1} display={"flex"}>
              <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <Row name="Distance">
                  <ValuePart>{distance} km</ValuePart>
                </Row>
                <Row name="Climb">
                  <ValuePart>{climb} m</ValuePart>
                </Row>
                <Row name="Rank">
                  <Box display="flex" alignItems="center">
                    <ValuePart>
                      {rank} / {ratio}
                    </ValuePart>
                    <Rating sx={{ ml: 1 }} value={ratio} readOnly />
                  </Box>
                </Row>
              </Box>
              <Box ml={5} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <Row name="Price range">
                  <ValuePart sx={{ mr: 1 }}>{priceMin} $</ValuePart>-<ValuePart sx={{ ml: 1 }}>{priceMax} $</ValuePart>
                </Row>
                <Row name="Hours">
                  <ValuePart>{hours} h</ValuePart>
                </Row>
                <Row name="Level">
                  <Box display="flex" alignItems="center">
                    <ValuePart>{level[0].toUpperCase() + level.slice(1)}</ValuePart>
                    <Level level={level} />
                  </Box>
                </Row>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ marginTop: 'auto', width: "100px", justifyContent: 'space-between'}}
                endIcon={expanded === name ? <IconChevronUp /> : <IconChevronDown />}
              >
                {expanded === name ? "Hide" : "Show"}
              </Button>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return <Box>{trailComps}</Box>;
};
