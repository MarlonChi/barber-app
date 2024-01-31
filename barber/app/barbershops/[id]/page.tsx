import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/BarbershopInfo";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    // TODO redirecionar para a home
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });
  return <>{barbershop && <BarbershopInfo barbershop={barbershop} />}</>;
};

export default BarbershopDetailsPage;
