import { Card, CardContent, CardHeader } from '@mui/material';

interface IInformationCard {
    title: string;
    description?: string;
    left: boolean;
    className?: string;
    button?: JSX.Element;
}

function InformationCardLight({ title, description, left, className, button }: IInformationCard) {
    const styleHeader = `text-black mt-5 ${left ? 'text-left' : 'text-right'}`;
    const parts = title.split(';');

    return (
        <Card
            className={`bg-white w-full h-full flex ${left ? 'flex-row' : 'flex-row-reverse'} ${className} shadow-2xl`}
            elevation={0}
        >
            <div className="flex flex-col w-full">
                <CardHeader
                    className={styleHeader}
                    title={
                        <div className="text-3xl font-bold text-black">
                            {parts.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    }
                />
                <CardContent className="text-black">
                    <div className={`text-xl whitespace-pre-wrap ${left ? 'lg:pr-10' : 'lg:pl-10'}  ${left ? 'text-left' : 'text-right'}`}>
                        {description}
                    </div>
                    {button && <div className="mt-4">{button}</div>}
                </CardContent>
            </div>
        </Card>
    );
}

export default InformationCardLight;
