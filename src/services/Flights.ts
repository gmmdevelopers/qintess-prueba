import flaightsData from "../data/vuelos.json";

export interface IFlights {
  id: string;
  origen: string;
  destino: string;
  precio: number;
  asientos: number;
}

export const availableFlights = () =>
  flaightsData.filter((a) => a.asientos > 0);

export const sortFlights = (order: "asc" | "desc" = "asc") =>
  [...flaightsData].sort((a, b) =>
    order === "asc" ? a.precio - b.precio : b.precio - a.precio
  );

export const findFlights = (query: string) => {
  const q = query.toLocaleLowerCase();
  return flaightsData.filter((f) => {
    if (f.origen.toLocaleLowerCase().localeCompare(q) === 0) {
      return true;
    }

    if (f.destino.toLocaleLowerCase().localeCompare(q) === 0) {
      return true;
    }
  });
};
