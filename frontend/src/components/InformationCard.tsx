import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

InformationCard.propTypes = {
    
};

function InformationCard({title, description}) {
    return (
        <Card sx={{ maxWidth: 345, backgroundColor: '#333', color: '#fff', borderRadius: 2 }}>
            <CardHeader
                title={
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                }
                action={<span style={{ fontSize: '1.5em' }}>🔴</span>}
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