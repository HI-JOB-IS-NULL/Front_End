import React from "react";
import styled from "styled-components";

export const SuggestionInput = styled.div`
  box-shadow: 0 0 14px rgb(0 0 0 / 8%);
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  max-height: 150px;
  overflow-y: auto;
  width: 480px;
  background: white;
`;
export const Suggestion = styled.div`
  align-items: center;
  cursor: pointer;
  padding: 2px 5px;
  &:hover {
    background-color: #f2f3f4;
  }
`;
