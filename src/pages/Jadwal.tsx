import provinsi from "../assets/provinsi.json";
import kabupaten from "../assets/kabupaten.json";
import imsak from "../assets/imsak.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiArrowUpSLine } from "@remixicon/react";
import { twMerge } from "tailwind-merge";

type ImsakType = {
    provinsi_id: string;
    kabupaten_id: string;
    kabupaten: string;
    provinsi: string;
    tahun: string;
    hijriah: string;
    data: Record<string, ImsakDataType>;
};

type ImsakDataType = {
    tanggal: number;
    imsak: string;
    subuh: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
};

const tableHeaders = ["Tanggal", "Imsak", "Subuh", "Terbit", "Dhuha", "Dzuhur", "Ashar", "Maghrib", "Isya"];

export default function Jadwal() {
    const [selectedProvinsi, setSelectedProvinsi] = useState(provinsi[0].id);
    const findKabupaten = useMemo(() => kabupaten.find((kab) => kab.provinsi === selectedProvinsi), [selectedProvinsi]);
    const [selectedKabupaten, setSelectedKabupaten] = useState(findKabupaten?.kabupaten[0].id);
    const findImsak = useMemo(() => (imsak as ImsakType[]).find((i) => i.kabupaten_id === selectedKabupaten), [selectedKabupaten]);
    const [filterIsOpen, setFilterIsOpen] = useState(true);
    const refKabupaten = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        setSelectedKabupaten(refKabupaten.current?.value);
    }, [selectedProvinsi]);

    function handleProvinsiChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedProvinsi(e.target.value);
    }
    function handleKabupatenChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedKabupaten(e.target.value);
    }

    return (
        <>
            <section className="mb-24">
                <div className="container mx-auto px-6 sm:px-8 lg:max-w-4xl bg-(image:--bg-bg) bg-repeat py-24 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-radial before:from-emerald-700/90 before:to-emerald-950/90 before:-z-10 before:pointer-events-none isolate">
                    <div className="absolute top-0 left-0 -z-10 pointer-events-none w-full h-full before:absolute before:top-0 before:left-0 before:bg-(image:--bg-top) before:bg-repeat-x before:w-full before:h-20 before:bg-contain before:bg-center"></div>
                    <h1 className="text-center text-4xl sm:text-5xl font-medium font-berkshire text-white mb-4">Jadwal Imsakiyah</h1>
                    <h2 className="text-xl sm:text-2xl font-medium text-center text-white mb-3">Ramadan 1446 H / 2025 M</h2>
                    <p className="text-white text-center">
                        Untuk daerah <span className="font-medium text-yellow-400">{findImsak?.kabupaten}</span> dan sekitarnya
                    </p>
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    {tableHeaders.map((header, i) => (
                                        <th key={i} className="py-3 font-berkshire font-normal bg-emerald-900 text-white/90 px-4">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/20">
                                {findImsak &&
                                    Object.entries(findImsak.data).map(([key, value]) => (
                                        <tr key={key} className="text-emerald-900 font-semibold *:even:bg-white/70 *:odd:bg-white/80">
                                            <td className="px-4 py-3 text-center">{value.tanggal}</td>
                                            <td className="px-4 py-3 text-center">{value.imsak}</td>
                                            <td className="px-4 py-3 text-center">{value.subuh}</td>
                                            <td className="px-4 py-3 text-center">{value.terbit}</td>
                                            <td className="px-4 py-3 text-center">{value.dhuha}</td>
                                            <td className="px-4 py-3 text-center">{value.dzuhur}</td>
                                            <td className="px-4 py-3 text-center">{value.ashar}</td>
                                            <td className="px-4 py-3 text-center">{value.maghrib}</td>
                                            <td className="px-4 py-3 text-center">{value.isya}</td>
                                        </tr>
                                    ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    {tableHeaders.map((header, i) => (
                                        <th key={i} className="py-3 font-berkshire font-normal bg-emerald-900 text-white/90 px-4">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section>
            <section
                className={twMerge(
                    "py-4 bg-white fixed bottom-0 left-0 right-0 z-10 border-t border-t-neutral-300 translate-y-full transition-transform",
                    filterIsOpen && "translate-y-0"
                )}
            >
                <div className="container mx-auto px-4 lg:max-w-4xl">
                    <form action="" className="flex items-center space-x-4">
                        <select
                            className="w-full appearance-none bg-white border border-neutral-300 rounded-lg h-10 px-4 pr-12 outline-hidden bg-(image:--bg-select) bg-[length:20px] bg-[right_16px_center] bg-no-repeat focus:ring focus:ring-emerald-600 focus:border-emerald-600"
                            onChange={handleProvinsiChange}
                        >
                            {provinsi.map((prov, i) => (
                                <option key={i} value={prov.id}>
                                    {prov.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-full appearance-none bg-white border border-neutral-300 rounded-lg h-10 px-4 pr-12 outline-hidden bg-(image:--bg-select) bg-[length:20px] bg-[right_16px_center] bg-no-repeat focus:ring focus:ring-emerald-600 focus:border-emerald-600"
                            onChange={handleKabupatenChange}
                            ref={refKabupaten}
                        >
                            {findKabupaten?.kabupaten.map((prov, i) => (
                                <option key={i} value={prov.id}>
                                    {prov.name}
                                </option>
                            ))}
                        </select>
                        {/* <button
                            type="submit"
                            className="h-10 px-4 rounded-lg bg-emerald-600 text-white font-semibold cursor-pointer hover:bg-emerald-700 w-full"
                        >
                            Cari
                        </button> */}
                    </form>
                </div>
                <button
                    type="button"
                    className="absolute bottom-full h-8 flex items-center px-4 right-4 cursor-pointer hover:bg-neutral-100 bg-white rounded-tl-lg rounded-tr-lg border-t border-l border-r border-neutral-300"
                    onClick={() => setFilterIsOpen((prev) => !prev)}
                >
                    <RiArrowUpSLine size={24} className={twMerge(filterIsOpen && "rotate-180")} />
                </button>
            </section>
        </>
    );
}
