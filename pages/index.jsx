
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navigation from "@/component/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Home() {
    return (
        <>

            <div
                className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
            >
                {/* <Navigation /> */}
                <div className="relative min-h-[93vh] overflow-hidden">
                    <video
                        className="fixed top-0 left-0 w-full h-full object-cover z-0"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/video/videoplayback.webm"
                    />

                    <div className="relative z-10 flex flex-col items-start p-10">
                        <h1 className="font-roboto mt-10 ml-13">
                            Welcome, To My BattleGround Mobile Multiplayers Online Game.
                        </h1>
                        <button className="bg-amber-400 text-black p-1 ml-13 my-2">
                            <a href="https://apkdownload.battlegroundsmobileindia.com/bgmi_3.9.0_homepage_DwqLVenf.apk">APK Download</a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}