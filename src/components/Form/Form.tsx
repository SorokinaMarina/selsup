"use client";
import "./Form.scss";
import { param } from "@/utils/constants";
import { useState, useEffect } from "react";
import { Props, ParamValue, Param } from "@/utils/interface";
import Input from "../Input/Input";

export default function Form() {
  // Переменная содержит динамичные данные,  которые может изменять пользователь
  const [paramValues, setParamValues] = useState<ParamValue[] | []>([]);

  // При первом рендере подтягиваем данные из хранилища
  useEffect(() => {
    const storedParamValues = localStorage.getItem("paramValues");
    if (storedParamValues) {
      setParamValues(JSON.parse(storedParamValues));
    }
  }, []);

  // Переменная содержит общие данные товара
  const [modelData, setModelData] = useState<Props>({
    params: param,
    model: [
      {
        paramValues: paramValues,
      },
    ],
  });

  return (
    <form className="form" action="#" id="form">
      <h1 className="form__title">Редактор параметров</h1>
      <fieldset className="form__fieldset">
        {param.map((item: Param) => (
          <Input
            key={item.id}
            item={item}
            setParamValues={setParamValues}
            paramValues={paramValues}
          />
        ))}
      </fieldset>
    </form>
  );
}
