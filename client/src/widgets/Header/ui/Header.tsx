"use client";

import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as Styled from "./styled";

export function Header() {
  return (
    <Styled.Container>
      <Styled.SearchWrapper>
        <Input
          placeholder="Поиск..."
          prefix={<SearchOutlined />}
          size="large"
        />
      </Styled.SearchWrapper>
    </Styled.Container>
  );
}

