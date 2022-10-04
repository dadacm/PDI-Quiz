/* eslint-disable no-param-reassign */
import { AnsweredQuestion, TestProps } from '../Components/testCard/TestCard.types';

export const updateTest = (correctTest: TestProps, answers: object, nota: number) => {
  const testsString = localStorage.getItem('tests');
  const allTests = testsString && JSON.parse(testsString);
  const answerIds = Object.keys(answers);
  const questionsArray: AnsweredQuestion[] = [];
  answerIds.map(answerId => questionsArray.push(answers[answerId]));
  const tests = allTests.map((test: TestProps) => {
    if (test.id === correctTest.id) {
      test['status'] = 3;
      test['newTest'] = questionsArray;
      test['nota'] = nota;
    }
    return test;
  });
  //   localStorage.removeItem('tests');
  localStorage.setItem('tests', JSON.stringify(tests));
};
