import { Snackbar } from '@material-ui/core';
import React from 'react';

<Snackbar></Snackbar>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
