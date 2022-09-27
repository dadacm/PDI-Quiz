import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert } from '@material-ui/lab';
import { RenderStatusProps, StatusTest, TestCardProps } from './TestCard.types';

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
  const {
    test: { name, status, newTest },
  } = props;
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
    <Card style={{ margin: '20px 0' }} className={classes.root}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader
          title={newTest[0].tema}
          subheader={
            <div style={{ width: '600px' }}>
              <p>{name}</p>
            </div>
          }
        />
        <CardActions disableSpacing>
          <Alert severity={renderStatus[status].color}>{renderStatus[status].text}</Alert>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {newTest.map((test, index) => (
            <div>
              <Typography paragraph>{`${index + 1}) ${test.questionInput}`}</Typography>
              <Typography paragraph>{`A) ${test.alternativeA}`}</Typography>
              <Typography paragraph>{`B) ${test.alternativeB}`}</Typography>
              <Typography paragraph>{`C) ${test.alternativeC}`}</Typography>
              <Typography paragraph>{`D) ${test.alternativeD}`}</Typography>
              <Typography paragraph>{`E) ${test.alternativeE}`}</Typography>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
