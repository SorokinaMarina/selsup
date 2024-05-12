"use client";
import "./Form.scss";
import { param } from "@/utils/constants";
import { useState, useEffect } from "react";
import { ParamValue, Param, Props } from "@/utils/interface";
import Input from "../Input/Input";
import { Dispatch, SetStateAction } from "react";

interface FromProps {
  setModelData: Dispatch<SetStateAction<Props | null>>;
}

export default function Form({ setModelData }: FromProps) {
  // Переменная содержит динамичные данные,  которые может изменять пользователь
  const [paramValues, setParamValues] = useState<ParamValue[]>([]);

  // При первом рендере подтягиваем данные из хранилища
  useEffect(() => {
    const storedParamValues = localStorage.getItem("paramValues");
    if (storedParamValues) {
      setParamValues(JSON.parse(storedParamValues));
    }
  }, []);

  // useEffect запускает функцию getModel при изменении paramValues
  useEffect(() => {
    setModelData(getModel);
  }, [paramValues]);

  // Функция, которая собирает данные в переменную modelData
  function getModel() {
    return {
      params: param,
      model: {
        paramValues: paramValues,
      },
    };
  }

  return (
    <form className="form" action="#" id="form">
      <h1 className="form__title">Редактор параметров</h1>
      <fieldset className="form__fieldset">
        {param.map(
          (item: Param): JSX.Element => (
            <Input
              key={item.id}
              item={item}
              setParamValues={setParamValues}
              paramValues={paramValues}
            />
          ),
        )}
      </fieldset>
    </form>
  );
}
