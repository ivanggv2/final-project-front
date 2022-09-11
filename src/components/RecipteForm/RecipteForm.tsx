import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ProtoRecipte } from "../../types/interfaces";
import ImageForm from "./ImageForm/ImageForm";
import IngredientsForm from "./IngredientsForm/IngredientsForm";
import ProcessForm from "./ProcessForm/ProcessForm";

const RecipteForm = (): JSX.Element => {
  const initialRecipte: ProtoRecipte = {
    name: "",
    autor: "",
    dificulty: "",
    image: "",
    ingredients: "",
    persons: 0,
    process: "",
  };

  const apiUrl = process.env.REACT_APP_API_URL!;
  const [recipte, setRecipte] = useState<ProtoRecipte>(initialRecipte);
  const [currentPage, setPage] = useState<number>(1);
  const user = useAppSelector((state) => state.user);

  const nextPage = (page: number) => {
    if (page === 3) {
      return;
    }
    setPage((page += 1));
    return;
  };

  const previousPage = (page: number) => {
    if (page === 1) {
      return;
    }
    setPage((page -= 1));
    return;
  };

  const addDataFromInputs = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setRecipte({ ...recipte, [event.target.name]: event.target.value });
  };

  const formData = new FormData();

  const createImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    formData.append("file", file);
  };

  formData.append("name", recipte.name);
  formData.append("autor", user.userName);
  formData.append("dificulty", recipte.dificulty);
  formData.append("ingredients", recipte.ingredients);
  formData.append("persons", recipte.persons.toString());
  formData.append("process", recipte.process);

  const submit = (event: React.FormEvent<HTMLFormElement>, url: string) => {
    event.preventDefault();
    console.log(formData.get("file"));
  };

  switch (currentPage) {
    case 1:
      return (
        <IngredientsForm
          handleChange={addDataFromInputs}
          recipte={recipte}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      );

    case 2:
      return (
        <ProcessForm
          handleChange={addDataFromInputs}
          recipte={recipte}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      );

    case 3:
      return (
        <ImageForm
          createImage={createImage}
          recipte={recipte}
          nextPage={nextPage}
          previousPage={previousPage}
          submit={(event) => submit(event, apiUrl)}
        />
      );

    default:
      break;
  }
  return <h1>Error Formulario no encontrado</h1>;
};

export default RecipteForm;
