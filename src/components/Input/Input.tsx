"use client";
import "./Input.scss";
import { Param, ParamValue, Select } from "@/utils/interface";
import { Dispatch, SetStateAction } from "react";
import { select } from "@/utils/constants";

interface InputProps {
  item: Param;
  setParamValues: Dispatch<SetStateAction<[] | ParamValue[]>>;
  paramValues: ParamValue[] | [];
}

export default function Input({
  item,
  setParamValues,
  paramValues,
}: InputProps) {
  const { id, name, type } = item;

  // Находим в массиве paramValues нужный нам объект с данными и записываем в переменную
  const values = paramValues.find((item) => {
    if (item !== undefined && item.paramId === id) {
      return item;
    }

    return "";
  });

  // Функция-слушатель клика записывает данные в массив paramValues
  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ): void {
    // Проверяем, есть ли в массиве с объектами paramValues совпадения по id с полем ввода
    const existId = paramValues.some(
      (item: ParamValue): boolean => item.paramId === +e.target.id,
    );

    if (!existId) {
      // Если совпадений нет, то создадим и добавим в массив paramValues новый объект с данными
      setParamValues((prev: ParamValue[]): ParamValue[] => [
        ...prev,
        { paramId: +e.target.id, value: e.target.value },
      ]);
    } else {
      // Если совпадения есть, то перезаписываем данные в объекте с совпадающим id
      const updatedValues = paramValues.map((item: ParamValue): ParamValue => {
        if (item.paramId === +e.target.id) {
          return { ...item, value: e.target.value };
        }

        return item;
      });

      // Обновляем объект paramValues
      setParamValues(updatedValues);
      localStorage.setItem("paramValues", JSON.stringify(updatedValues));
    }
  }

  return (
    <label className="input">
      {name}
      {(type === "text" || type === "number") && (
        <input
          id={String(id)}
          className="input__element"
          type={type}
          name={name}
          onChange={handleChange}
          value={values?.value || ""}
        />
      )}
      {type === "select" && (
        <select
          className="input__element input__element_select"
          id={String(id)}
          name={name}
          onChange={handleChange}
          value={values?.value}
        >
          {select.map((item: Select) => {
            if (item.id === id) {
              return item.value.map((el: string) => (
                <option className="input__option" key={el} value={el}>
                  {el}
                </option>
              ));
            }
          })}
        </select>
      )}
    </label>
  );
}
