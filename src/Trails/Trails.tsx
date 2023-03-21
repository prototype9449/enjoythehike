import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Button,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";
import { ReactSVG } from "react-svg";
import { TrailDetails } from "./TrailDetails";
import { Row, ValuePart } from "./shared";
import { useGetTrails } from "../core/queries/useGetTrails";
import { TrailLevel, TrailOption } from '../types'

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

const TrailOptions = ({ name, trailId, options }: { options: TrailOption[], trailId: string, name: string }) => {
  const opts = options.map((x, i) => (
    <Box key={`${trailId}_${x.optionId}`} borderTop={i !== 0 ? "1px solid lightgrey" : ''} pt={2} pb={2} ml={4}>
      <TrailDetails {...x} trailName={name} trailId={trailId}/>
    </Box>
  ));
  return <Box width="100%">{opts}</Box>;
};

const MuiAccordion = styled((props: AccordionProps) => <Accordion disableGutters {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

type Props = {
  formPayload: any;
};

export const Trails = ({ formPayload }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { data, isFetched } = useGetTrails(formPayload);

  const trailComps = data?.map(({ trailId, name, hours, level, rank, climb, ratio, image, distance, priceMax, priceMin, options }) => {
    return (
      <MuiAccordion key={trailId} expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box height="120px" width="180px"><img src={image} height="100%" alt={name} /></Box>
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
          <TrailOptions name={name} options={options} trailId={trailId}/>
        </AccordionDetails>
      </MuiAccordion>
    );
  });

  return (
    <Box>
      {data?.length || !isFetched ? (
        trailComps
      ) : (
        <Box width="100%" height="300px" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h4">No trails found. Try to change the parameters</Typography>
        </Box>
      )}
    </Box>
  );
};
