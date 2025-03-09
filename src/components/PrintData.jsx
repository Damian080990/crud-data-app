import { useQuery } from "@tanstack/react-query";
import { Fragment, useRef } from "react";
import { NavLink, useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { fetchCoreById } from "../helpers";

export const PrintData = () => {
  const { id } = useParams();

  const contentRef = useRef(); // Tworzymy referencję do tabeli
  const reactToPrintFn = useReactToPrint({ contentRef }); //Content który chcemy wydrukować musi się nazywać contentRef

  const { data, isLoading, error } = useQuery({
    queryKey: ['cores', id],
    queryFn: () => fetchCoreById(id),
    enabled: !!id, // Zapytanie wykona się tylko, jeśli id istnieje
  });

  if (isLoading) return <p>Loading...</p> //TODO
  if (error) return <p>Error: {error.message}</p> //TODO

  return (
    <Fragment>
      <nav className="navigate flex p-8 w-full justify-center items-center mb-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `p-5 rounded-lg font-bold transition-all shadow-md ${isActive ? "bg-orange-500 text-white" : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
            }`
          }
        >
          Table Data
        </NavLink>
      </nav>
      <div className="content mt-4" ref={contentRef}>  {/* Przypisujemy referencję do sekcji, którą chcemy wydrukować */}
        <h2 className="text-xl font-semibold font-mono text-center mb-6">{
          `KARTA PRZEKAZANIA RDZENIA NR: ${data?.coresID || ""}`}<br />{`z dnia ${data.created_date || ""}`}
        </h2>
        <div>
          <table className="border-separate border-spacing-x-4 border-spacing-y-2 border border-gray-300 rounded-lg shadow-md min-w-3xl">
            <tbody>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">ID Klienta:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data.clientID || ""}</th>
              </tr>
              <tr className="bg-white">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Nazwa firmy:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data?.fullName || ""}</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">NR FAKTURY:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data?.documentID || ""}</th>
              </tr>
              <tr className="bg-white">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Producent części:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data?.manufacturer || ""}</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Index części:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data?.productIndex || ""}</th>
              </tr>
              <tr className="bg-white">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Ilość:</th>
                <th className="px-4 py-2 text-left text-gray-800">{data?.quantityProductsSent || ""}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className="mt-4 py-4 px-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all " onClick={() => reactToPrintFn()}>Print</button>
      </div>
    </Fragment>
  );
};