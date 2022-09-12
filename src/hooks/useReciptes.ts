import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  deleteRecipteActionCreator,
  loadRecipteActionCreator,
  loadReciptesActionCreator,
} from "../store/recipte/recipteSlice";
import { Recipte } from "../types/interfaces";

const useReciptes = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const getReciptes = useCallback(
    async (apiUrl: string) => {
      try {
        const response = await fetch(apiUrl);
        const { reciptes } = await response.json();

        dispatch(loadReciptesActionCreator(reciptes));
      } catch (error) {
        return error;
      }
    },
    [dispatch]
  );

  const createRecipte = async (data: FormData, apiUrl: string) => {
    try {
      const response: AxiosResponse<Recipte> = await axios.post(apiUrl, data);

      if (response.status !== 200) {
        throw new Error();
      }

      dispatch(loadRecipteActionCreator(response.data));
      navigator("/home");
    } catch (error) {
      return 400;
    }
  };

  const deleteRecipte = async (id: string, apiUrl: string) => {
    const config = {
      params: { id: id },
    };
    try {
      const response = await axios.delete(apiUrl, config);

      if (response.status !== 201) {
        throw new Error();
      }

      dispatch(deleteRecipteActionCreator(id));
      navigator("/home");
    } catch (error) {
      return error;
    }
  };

  return { getReciptes, createRecipte, deleteRecipte };
};

export default useReciptes;
