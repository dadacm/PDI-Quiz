import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { Questions, RenderStatusProps, StatusTest, TestCardProps } from './TestCard.types';
import TestModal from '../studantComponents/testModal/TestModal';
import { QuestionAnswered } from '../studantComponents/testModal/TestModal.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100px',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

export default function TestCard(props: TestCardProps) {
  const { test, isTeacher, testStartButton } = props;
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const renderStatus: RenderStatusProps = {
    [StatusTest.EM_ABERTO]: { text: 'Em aberto', color: 'warning' },
    [StatusTest.EM_ANDAMENTO]: { text: 'Em andamento', color: 'info' },
    [StatusTest.CONCLUIDO]: { text: 'Concluido', color: 'success' },
  };

  return (
    <Card style={{ margin: '20px 0', overflow: 'auto' }} className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader title={test.newTest[0]?.tema} subheader={<div style={{ width: '600px' }}>{isTeacher && <p>{test.name}</p>}</div>} />
        <CardActions disableSpacing>
          {isTeacher && <Alert severity={renderStatus[test.status].color}>{renderStatus[test.status].text}</Alert>}
          {isTeacher && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </IconButton>
          )}
          {testStartButton ? (
            <Button color="primary" onClick={handleOpenModal} variant="contained">
              Iniciar prova
            </Button>
          ) : (
            <Typography style={{ paddingRight: '10px' }} color={test.nota && test.nota > 5 ? 'primary' : 'secondary'}>
              Nota: {test.nota}
            </Typography>
          )}
        </CardActions>
      </div>
      {isTeacher && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {test.newTest.map((test, index) => (
              <div style={{ margin: '20px 0' }}>
                <Typography paragraph>{`${index + 1}) ${test.questionInput}`}</Typography>
                <Typography
                  color={test.answer === 'A' && test.answer === test.corectAlternative ? 'primary' : (test.answer === 'A' && 'secondary') || undefined}
                  paragraph>{`A) ${test.alternativeA}`}</Typography>
                <Typography
                  color={test.answer === 'B' && test.answer === test.corectAlternative ? 'primary' : (test.answer === 'B' && 'secondary') || undefined}
                  paragraph>{`B) ${test.alternativeB}`}</Typography>
                <Typography
                  color={test.answer === 'C' && test.answer === test.corectAlternative ? 'primary' : (test.answer === 'C' && 'secondary') || undefined}
                  paragraph>{`C) ${test.alternativeC}`}</Typography>
                <Typography
                  color={test.answer === 'D' && test.answer === test.corectAlternative ? 'primary' : (test.answer === 'D' && 'secondary') || undefined}
                  paragraph>{`D) ${test.alternativeD}`}</Typography>
                <Typography
                  color={test.answer === 'E' && test.answer === test.corectAlternative ? 'primary' : (test.answer === 'E' && 'secondary') || undefined}
                  paragraph>{`E) ${test.alternativeE}`}</Typography>
                {test.answer && (
                  <Typography color={test.answer === test.corectAlternative ? 'primary' : 'secondary'}>Resposta correta: {test.corectAlternative}</Typography>
                )}
              </div>
            ))}
          </CardContent>
        </Collapse>
      )}
      <TestModal questions={test} open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} />
    </Card>
  );
}
