import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from '@material-ui/core';

import React from 'react';
import { radioButonStyle } from '../questionRegistration/QuestionRegistration.style';
import { TemaListProps } from './TemaListProps.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'auto',
      height: 220,
    },
  }),
);
function SelectList(props: TemaListProps) {
  const { listArray, isTema, selected, handleSelect } = props;
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {listArray?.map(listItem => (
        <ListItem style={{ justifyContent: 'space-between' }} key={listItem} button onClick={() => handleSelect(listItem)}>
          <label htmlFor="select-studant">{listItem}</label>
          <ListItemIcon>
            {!isTema ? (
              // <>
              <Checkbox
                inputProps={{ id: 'select-studant' }}
                edge="end"
                onChange={() => {
                  handleSelect(listItem);
                }}
                data-testid="select-studant"
                checked={selected.indexOf(listItem) !== -1}
              />
            ) : (
              // </>
              <RadioGroup
                name="Tema"
                value={selected}
                onChange={() => {
                  handleSelect(listItem);
                }}>
                <FormControlLabel style={radioButonStyle} value={listItem} control={<Radio data-testid="tema-select" />} label="" />
              </RadioGroup>
            )}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );
}
export default SelectList;
