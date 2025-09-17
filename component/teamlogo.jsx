import Image from "next/image";

const teams = [
    { name: "8Bit", src: "/team-logo/8-bit.png" },
    { name: "aj", src: "/team-logo/aj.png" },
    { name: "anime", src: "/team-logo/anime.png" },
    { name: "Blind Esports", src: "/team-logo/blind.png" },
    { name: "danger", src: "/team-logo/danger.png" },
    { name: "empire", src: "/team-logo/empire.png" },
    { name: "Entity Gaming", src: "/team-logo/entity.png" },
    { name: "Gladiator", src: "/team-logo/gladiator.png" },
    { name: "Global Esports", src: "/team-logo/global.png" },
    { name: "GodLike", src: "/team-logo/GodLike.png" },
    { name: "kong", src: "/team-logo/kong.png" },
    { name: "MADx", src: "/team-logo/MADX.png" },
    { name: "MADxGHAAV", src: "/team-logo/MADxGHAAV.png" },
    { name: "Mayur Gaming", src: "/team-logo/mayurgaming.png" },
    { name: "medal", src: "/team-logo/medal.png" },
    { name: "niral", src: "/team-logo/niral.png" },
    { name: "noob", src: "/team-logo/noob.png" },
    { name: "Orange Rock", src: "/team-logo/Orange_Rock.png" },
    { name: "Orangutan Gaming", src: "/team-logo/orangutan.png" },
    { name: "Revenant Esports", src: "/team-logo/revenant.png" },
    { name: "TSM-Entity", src: "/team-logo/tsm-logo.png" },
    { name: "Team XSpark", src: "/team-logo/XSpark.png" },
];

export default function TeamLogos() {
    const scrollTeams = [...teams, ...teams]; // duplicate for smooth loop

    return (
        <section className="bg-[#0f0f0f] overflow-hidden py-6">
            <div className="flex whitespace-nowrap animate-marquee">
                {scrollTeams.map((team, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center mx-6"
                    >
                        <Image
                            src={team.src}
                            alt={team.name}
                            width={100}
                            height={100}
                            style={{objectFit: "contain"}}
                            className="transition-transform object-contain min-w-[100px] max-h-[110px] hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}