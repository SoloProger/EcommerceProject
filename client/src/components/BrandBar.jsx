import React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row xs="auto" className="d-flex">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          border={brand.id === device.selectedBrand.id ? "primary" : "light"}
          onClick={() => device.setSelectedBrand(brand)}
          key={brand.id}
          className="p-3"
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
