import styled from "styled-components";

import { styles } from "styles/theme";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;

  .userData {
    button {
      margin: 0.5rem;
      padding: 0.5rem;
    }
  }
  form {
    width: 400px;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    div {
      justify-content: center;
      margin: 0;
    }
  }
`;
