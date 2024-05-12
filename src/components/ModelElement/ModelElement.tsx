"useClient";
import "./ModelElement.scss";
import { Param, Props, ParamValue } from "@/utils/interface";
import { useEffect, useState } from "react";

interface ModelElementProps {
  item: Param;
  model: Props | null;
}

export default function ModelElement({ item, model }: ModelElementProps) {
  const { name, id } = item;
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const foundItem = model?.model.paramValues.find(
      (paramValue: ParamValue) => paramValue.paramId === id,
    );
    if (foundItem) {
      setValue(foundItem.value);
    } else {
      setValue("");
    }
  }, [model, id]);
  return (
    <div className="model-element">
      <p className="model-element__name">{name}</p>
      <p className="model-element__value">{value}</p>
    </div>
  );
}
