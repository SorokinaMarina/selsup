"use client";
import Form from "@/components/Form/Form";
import { useState } from "react";
import { Props } from "@/utils/interface";
import Model from "@/components/Model/Model";

export default function Home() {
  // Переменная содержит общие данные товара
  const [modelData, setModelData] = useState<Props | null>(null);
  console.log(modelData);
  return (
    <>
      <main className="main">
        <Form setModelData={setModelData} />
        {modelData !== null && <Model model={modelData} />}
      </main>
    </>
  );
}
