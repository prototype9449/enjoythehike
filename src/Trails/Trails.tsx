import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  LinearProgress,
  Rating,
  styled,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";
import { TrailLevel } from "../BookingForm/types";
import { ReactSVG } from "react-svg";
import { TrailDetails, TrailOption } from './TrailDetails'
import { Row, ValuePart } from './shared'

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
  options: TrailOption[];
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
    options: [
      {
        hotel: {
          name: "Resort hotel super",
          price: 80,
          ratio: 4.6,
        },
        date: "25 of July",
        lunch: {
          price: 12,
          dish: "Rice with salmon",
        },
        taxi: {
          type: "comfort",
          price: 40,
        },
      },
    ],
  },
];


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

const TrailOptions = ({ options }: { options: TrailOption[] }) => {
  const opts = options.map((x) => (
    <Box>
      <TrailDetails {...x} />
    </Box>
  ));
  return <Box width="100%">{opts}</Box>;
};

const MuiAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const Trails = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const trailComps = trails.map(({ name, hours, level, rank, climb, ratio, image, distance, priceMax, priceMin, options }) => {
    return (
      <MuiAccordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Box display="flex" justifyContent="space-between" width="100%">
            <img src={image} height="120px" alt={name} />
            <Box ml={5} flex={1} display={"flex"}>
              <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <Row name="Name">
                  <ValuePart fontWeight="bold">{name}</ValuePart>
                </Row>
                <Row name="Distance">
                  <ValuePart>{distance} km</ValuePart>
                </Row>
                <Row name="Climb">
                  <ValuePart>{climb} m</ValuePart>
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
              <Box ml={5} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                <Row name="Rank" flex="0.33">
                  <Box display="flex" alignItems="center">
                    <ValuePart>
                      {rank} / {ratio}
                    </ValuePart>
                    <Rating sx={{ ml: 1 }} value={ratio} readOnly />
                  </Box>
                </Row>
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ marginTop: "auto", width: "100px", justifyContent: "space-between" }}
                endIcon={expanded === name ? <IconChevronUp /> : <IconChevronDown />}
              >
                {expanded === name ? "Hide" : "Show"}
              </Button>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TrailOptions options={options} />
        </AccordionDetails>
      </MuiAccordion>
    );
  });

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ height: "5px" }} />
      </Box>
      {trailComps}
    </Box>
  );
};
