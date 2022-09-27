import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import TestCard from '../testCard/TestCard';
import { TestCardProps, TestProps } from '../testCard/TestCard.types';

// import { Container } from './styles';
function TestsList() {
  const testsString = localStorage.getItem('tests');
  const allTests = testsString && JSON.parse(testsString);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const allPages = Math.ceil(allTests.length / 4);
  let paginationCard = 0;
  let pageCard = 0;
  return (
    <div>
      {allTests.map((test: TestProps) => {
        paginationCard += 1;
        if (paginationCard === 4) {
          pageCard += 1;
          setPage(pageCard);
          paginationCard = 0;
          return <TestCard test={test} />;
        }
        return <TestCard test={test} />;
      })}
      <div>
        <Typography>Page: {page}</Typography>
        <Pagination count={allPages} page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}

export default TestsList;
