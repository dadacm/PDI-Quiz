export interface TestProps {
  name: string;
  status: string;
  newTest: [
    {
      questionInput: string;
      tema: string;
      alternativeA: string;
      alternativeB: string;
      alternativeC: string;
      alternativeD: string;
      alternativeE: string;
      corectAlternative: string;
    },
  ];
}
export interface TestCardProps {
  test: {
    name: string;
    status: string;
    newTest: [
      {
        questionInput: string;
        tema: string;
        alternativeA: string;
        alternativeB: string;
        alternativeC: string;
        alternativeD: string;
        alternativeE: string;
        corectAlternative: string;
      },
    ];
  };
}
