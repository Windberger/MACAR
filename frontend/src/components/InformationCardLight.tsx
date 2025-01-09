import { Card, CardContent, CardHeader } from "@mui/material";
import { BiSolidCarWash, BiSolidCarMechanic } from "react-icons/bi";

interface IInformationCard {
    title: string;
    description: string;
    left: boolean;
}

function InformationCardLight({ title, description, left }: IInformationCard) {
    const styleHeader = "text-black mt-5 " + (left ? "text-left" : "text-right");
    const parts = title.split(";");

    return (
        <Card
            className="bg-white mt-5 mb-4 w-full h-full p-5 border-transparent"
            style={{ borderRadius: "30px" }}
            elevation={0}
        >
            <CardHeader
                className={styleHeader}
                title={
                    <>
                        <div className="text-3xl font-bold flex flex-col items-center mb-5">
                            <div
                                className="mb-4 bg-opacity-100 border rounded-3xl border-transparent p-4 flex justify-center">
                                {left ? <BiSolidCarWash size={48} color="#b91c1c" /> : <BiSolidCarMechanic size={48} color="#b91c1c" />}
                            </div>
                        </div>
                        <div className={"text-3xl font-bold flex flex-col text-black"}>
                            {parts[0]}
                            <br/>
                            {parts[1]}
                            <div
                                className="h-1 bg-red-800 rounded mt-2 thick-glow-line"
                            ></div>
                        </div>
                    </>
                }
            />
            <CardContent className="text-black mb-4">
                <div className="text-xl text-justify">{description}</div>
            </CardContent>
        </Card>
    );
}

export default InformationCardLight;