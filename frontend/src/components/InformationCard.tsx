import { Card, CardContent, CardHeader } from "@mui/material";
import { IoCarSport } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";

interface IInformationCard {
    title: string;
    description: string;
    left: boolean;
}

function InformationCard({ title, description, left }: IInformationCard) {
    const styleHeader = "text-white mt-5 " + (left ? "text-left" : "text-right");
    const parts = title.split(";");

    return (
        <Card
            className="bg-card mt-5 mb-4 w-full h-full p-5 border-transparent"
            style={{ borderRadius: "30px" }}
            elevation={0}
        >
            <CardHeader
                className={styleHeader}
                title={
                    <>
                        <div className="text-3xl font-bold flex flex-col items-center mb-5">
                            <div
                                className="mb-4 icon-glow bg-opacity-100 border rounded-3xl border-transparent p-4 flex justify-center">
                                {left ? <IoCarSport size={48} /> : <FaShop size={48} />}
                            </div>
                        </div>
                        <div className={"text-3xl font-bold flex flex-col"}>
                            {parts[0]}
                            <br />
                            {parts[1]}
                            <hr className="h-px mt-2 bg-gray-200 border-0 dark:bg-red-800" />
                        </div>
                    </>
                }
            />
            <CardContent className="text-white mb-4">
                <div className="text-xl text-justify">{description}</div>
            </CardContent>
        </Card>
    );
}

export default InformationCard;