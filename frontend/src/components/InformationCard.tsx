import {Card, CardContent, CardHeader} from "@mui/material";

interface IInformationCard {
    title: string,
    description: string,
    left: boolean
}

function InformationCard({title, description, left}: IInformationCard) {
    const styleHeader = "text-white mt-5 text-left " + (left ? "text-left" : "text-right");

    const parts= title.split(";");

    return (
        <Card className="card-glow bg-grey mt-5 mb-4 ml-4 w-[450px] h-[500px] p-5" style={{borderRadius: "30px"}}>


            <CardHeader
                className={styleHeader}
                title={
                    <div className="text-3xl font-bold">
                        {parts[0]}
                        <br/>
                        {parts[1]}
                    </div>
                }
            />
            <CardContent className="text-white mb-4">
                <div className="text-xl text-justify">
                    {description}
                </div>
            </CardContent>
        </Card>
    );
}

export default InformationCard;