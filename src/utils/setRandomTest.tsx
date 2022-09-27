export const setRandomTest = (questions: [{}], questionQuantity: number, name: string) => {
  const newTest = [];
  for (let i = 0; i <= questionQuantity - 1; i += 1) {
    const j = Math.floor(Math.random() * (i + 1));
    newTest.push(questions[Math.floor(Math.random() * questions.length)]);
  }
  return { name, newTest, status: 'em aberto' };
};
