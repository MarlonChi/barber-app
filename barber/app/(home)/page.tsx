import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../_components/Header";
import Search from "./_components/Search";
import BookingItem from "../_components/BookingItem";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Marlon</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' d 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
    </div>
  );
}
