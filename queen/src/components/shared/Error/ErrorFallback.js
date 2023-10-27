import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { dependencies, version } from '../../../../package.json';

const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '');

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    top: '3em',
    padding: '1em',
    textAlign: 'center',
  },
  error: {
    backgroundColor: 'white',
    textAlign: 'left',
  },
  resetButton: {
    marginTop: '1em',
    color: 'white',
  },
  title: {
    color: 'white',
    margin: '0.5em',
  },
  alignBlock: {
    textAlign: 'left',
    display: 'block',
  },
}));

export const ErrorFallback = ({ error }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box className={classes.root} bgcolor="error.main" role="alert">
        <Typography variant="h4" className={classes.title}>
          <b>{`QUEEN V1 :`}</b>
          {`Une erreur inconnue est survenue`}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{`Détail de l'erreur`}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.alignBlock}>
            <p>
              <b>{`Avant tout chose, veuillez vérifier que le questionnaire est compatible "lunatic-v1" 😉`}</b>
            </p>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>{`Information sur l'application`}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.alignBlock}>
            <Typography>
              {`Version de Queen : `}
              <b>{version}</b>
            </Typography>
            <Typography>
              {`Version de Lunatic : `}
              <b>{lunaticVersion}</b>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};
