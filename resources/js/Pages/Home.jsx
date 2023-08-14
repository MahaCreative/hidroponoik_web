import { router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import BarWarnaPH from "@/Pages/Components/BarPH";
import moment from "moment-timezone";

export default function Home(props) {
    const [data, setData] = useState(null);

    const [currentTime, setCurrentTime] = useState(
        moment().tz("Asia/Jakarta").format("HH:mm:ss")
    );
    // Menggunakan useEffect untuk melakukan subscribe saat komponen Home dimount
    useEffect(() => {
        const channel = window.Echo.channel("mqtt");
        const listener = channel.listen(".mqtt.resive", (e) => {
            console.log("====================================");
            console.log(e);
            console.log("====================================");
            // Memasukkan data dari e ke dalam state data
            setData(e);
        });

        // Unsubscribe dari channel dan listener saat komponen Home akan di-unmount
        return () => {
            channel.stopListening(".mqtt.resive");
        };
    }, []); // Passing empty array as second argument to useEffect makes it run only once during mount

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().tz("Asia/Jakarta").format("HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const DinamoHandler = (e) => {
        let status = e;

        router.post(route("publish"), { data: status });
    };

    return (
        <div className="w-full h-screen bg-slate-950 relative">
            <div className="absolute left-0 w-full h-full flex justify-center items-center">
                <img src="./image/tomakaka.png" alt="" className="w-1/2" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-slate-800/50 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-0 h-full w-full">
                <div className="px-3 py-6">
                    <div className="relative">
                        <div className="flex items-center gap-3 relative border-b border-slate-800 border-dashed sahdow-md shadow-slate-400/50 px-4 py-2.5">
                            <img
                                className="w-12"
                                src="./image/fikom.jpg"
                                alt=""
                            />
                            <h3 className="text-white font-bold">
                                IOT HIDROPONIK
                            </h3>
                        </div>
                        {/* MENU */}
                        {data ? (
                            <div className="my-6 mx-4">
                                {/* tombol */}
                                <div className="flex justify-between items-center my-3">
                                    <div
                                        className={
                                            "bg-green-600 uppercase py-2 px-4 rounded-md shadow-sm shadow-gray-300/30 text-white"
                                        }
                                    >
                                        {currentTime}
                                    </div>
                                    <button
                                        onClick={() =>
                                            DinamoHandler(
                                                data.message != null &&
                                                    data.message.statusDinamo1
                                            )
                                        }
                                        className={clsx(
                                            data.message != null &&
                                                data.message.statusDinamo1 ===
                                                    "on"
                                                ? "bg-green-500"
                                                : "bg-red-500",
                                            "uppercase py-2 px-4 rounded-md shadow-sm shadow-gray-300/30 text-white"
                                        )}
                                    >
                                        {data.message != null &&
                                        data.message.statusDinamo1 === "on"
                                            ? "Off Dinamo 1"
                                            : "On Dinamo 1"}
                                    </button>
                                </div>

                                <div>
                                    {data.message != null && (
                                        <BarWarnaPH
                                            phValue={data.message.dataPH}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-4 justify-between items-center gap-x-4">
                                    <div className="w-full flex items-center justify-between  bg-slate-800 rounded-md shadow-sm shadow-slate-300/50 py-4 px-8">
                                        <h3 className="text-2xl text-blue-500 font-bold">
                                            PH AIR
                                        </h3>
                                        <h3 className="text-4xl text-blue-500 font-bold">
                                            {data.message != null &&
                                                data.message.dataPH}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
