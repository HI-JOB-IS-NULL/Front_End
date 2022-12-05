import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar({ placeholder }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Container>
      <div className="search">
        <div className="search--inputs">
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => setSearchKeyword(e.target.value)}
            value={searchKeyword}
            className="search-inputs-input"
          />
          <div className="search--icon">
            <SearchOutlinedIcon />
          </div>
        </div>
        <div className="data--result"></div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .search {
    .search--inputs {
      position: relative;
      display: flex;
      align-items: center;

      .search-inputs-input {
        display: block;
        width: 500px;
        box-shadow: 0 4px 10px rgb(0 0 0 / 12%), 0 0 1px rgb(0 0 0 / 5%) inset;
        border: none;
        border-radius: 50px;
        padding: 10px 0 10px 50px;
        font-size: 15px;
        line-height: 20px;
        outline: none;
      }

      .search--icon {
        position: absolute;
        padding-left: 15px;
      }
    }
  }
`;
