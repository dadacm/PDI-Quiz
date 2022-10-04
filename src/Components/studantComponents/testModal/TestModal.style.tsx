import styled from 'styled-components';

export const TestModalContainer = styled.div`
  text-align: center;
  width: 450px;
  min-height: 500px;
  height: min-content;
  transform: translate(-50%, 50%);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 10px 10px 42px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: whitesmoke;
  position: relative;
  bottom: 40%;
  left: 50%;
`;
export const InputSection = styled.section`
  flex: 1;
  overflow: auto;
  min-height: 50px;
  max-height: 100px;
`;
export const GenerateTestContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
