
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

InformationCard.propTypes = {
    
};

interface IInformationCard{
    title: string,
    description: string
}

function InformationCard({title, description} : IInformationCard) {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: '#333', color: '#fff', borderRadius: 2 }}>
            <CardHeader
                title={
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                }
                sx={{ color: '#fff' }}
            />
            <CardContent>
                <Typography variant="body2" color="inherit">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InformationCard;