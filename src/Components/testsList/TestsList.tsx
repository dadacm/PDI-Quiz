import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useMemo } from 'react';
import TestCard from '../testCard/TestCard';
import { TestCardProps, TestProps } from '../testCard/TestCard.types';

function TestsList() {
  const testsString = localStorage.getItem('tests');
  const allTests = testsString && JSON.parse(testsString);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const pageSize = 4;
  const allPages = Math.ceil(allTests.length / pageSize);
  const currentTestsData = useMemo(() => {
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return allTests.slice(firstPageIndex, lastPageIndex);
  }, [page]);
  return (
    <div>
      {currentTestsData.map((test: TestProps) => (
        <TestCard test={test} />
      ))}
      <div>
        <Pagination count={allPages} page={page} onChange={handleChangePage} />
      </div>
    </div>
  );
}

export default TestsList;
