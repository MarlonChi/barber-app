import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";
import Header from "../_components/Header";
import Search from "./_components/Search";
import BookingItem from "../_components/BookingItem";
import BarberShopItem from "./_components/BarberShopItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session?.user.name?.split(" ")[0]}`
            : "Olá! Faça login para realizar os agendamento."}
        </h2>
        <p className="capitalize text-sm mt-3">
          {format(new Date(), "EEEE',' d 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Agendamentos
        </h2>

        {confirmedBookings.length > 0 && (
          <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops?.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Mais populares
        </h2>
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops?.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
