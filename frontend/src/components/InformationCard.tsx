import "../App.css";
import { Card, CardContent, CardHeader } from "@mui/material";

interface IInformationCard {
    title: string,
    description: string
}

function InformationCard({ title, description }: IInformationCard) {
    return (
        <Card className="card-glow bg-grey mt-5 mb-4 ml-4 w-[450px] h-[500px] rounded-[20px]">
            <CardHeader
                className="text-white mt-5 mb-5"
                title={
                    <div className="text-3xl font-bold">
                        {title}
                    </div>
                }
            />
            <CardContent className="text-white mb-4">
                <div className="text-xl">
                    {description}
                </div>
            </CardContent>
        </Card>
    );
}

export default InformationCard;