import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { FaArrowUp } from "react-icons/fa";

const colors = [
    "#800080", // Ungu (pH 12 - 14)
    "#0000FF", // Biru (pH 9 - 11)
    "#20B2AA", // Biru hijau (pH 8)
    "#00FF00", // Hijau netral (pH 7)
    "#ADFF2F", // Hijau kuning (pH 6)
    "#FFFF00", // Kuning (pH 5)
    "#FFA500", // Oranye (pH 4)
    "#FF0000", // Merah (pH 1 - 3)
];

const barWidth = 200;
const barHeight = 20;

const BarWarnaPH = ({ phValue }) => {
    const [needleLength, setNeedleLength] = useState((phValue / 14) * barWidth);

    // Update panjang jarum ketika nilai pH berubah
    useEffect(() => {
        setNeedleLength((phValue / 14) * barWidth);
    }, [phValue]);

    return (
        <div className="flex items-center flex-col bg-slate-800/50 py-2 rounded-md backdrop-blur-sm shadow-sm shadow-gray-300/50 my-3">
            {/* Tampilkan bar warna pH */}
            <h3 className="font-extrabold text-blue-600 text-3xl">BAR PH</h3>
            <div
                style={{
                    display: "flex",
                    width: barWidth,
                    height: barHeight,
                    borderRadius: "4px",
                    overflow: "hidden",
                }}
            >
                {colors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            height: "100%",
                            background: color,
                        }}
                    />
                ))}
            </div>
            {/* Tampilkan jarum yang menunjukkan warna pH air */}
            <div
                className="duration-300 transition-all ease-in-out"
                style={{
                    position: "relative",
                    width: needleLength,
                    height: barHeight,
                    top: -barHeight,
                    left: barWidth / 2 - needleLength / 2,
                }}
            >
                <IconContext.Provider value={{ size: "1.5em" }}>
                    <FaArrowUp />
                </IconContext.Provider>
            </div>
            {/* Tampilkan nilai pH air */}
            <div
                style={{ textAlign: "center" }}
                className="text-blue-600 font-extrabold"
            >
                pH: {phValue}
            </div>
        </div>
    );
};

export default BarWarnaPH;
