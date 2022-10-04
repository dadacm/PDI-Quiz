import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useMemo } from 'react';
import TestCard from '../testCard/TestCard';
import { TestCardProps, TestProps } from '../testCard/TestCard.types';

function TestsList({ isTeacher, allTests, testStartButton }: { testStartButton?: boolean; isTeacher?: boolean; allTests: [] }) {
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const pageSize = 4;
  const allPages = allTests ? Math.ceil(allTests.length / pageSize) : 0;
  const currentTestsData = useMemo(() => {
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return allTests && allTests.slice(firstPageIndex, lastPageIndex);
  }, [page]);
  return (
    <div>
      {allTests && currentTestsData.map((test: TestProps) => <TestCard testStartButton={testStartButton} isTeacher={isTeacher} test={test} />)}
      {allPages > 1 && (
        <div>
          <Pagination count={allPages} page={page} onChange={handleChangePage} />
        </div>
      )}
    </div>
  );
}

export default TestsList;
