import "./Model.scss";
import { Props } from "@/utils/interface";
import ModelElement from "../ModelElement/ModelElement";
import { Param, ParamValue } from "@/utils/interface";

interface ModelProps {
  model: Props | null;
}

export default function Model({ model }: ModelProps) {
  return (
    <section className="model">
      <h2 className="model__title">Итоговая модель данных</h2>
      {model?.params.map((item: Param): JSX.Element => {
        return <ModelElement key={item.name} item={item} model={model} />;
      })}
    </section>
  );
}
