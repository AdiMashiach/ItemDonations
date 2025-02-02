import { Circle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type StatusLabelProps = {
    text: string,
    color: string,
};

const StatusLabel = ({ text, color }: StatusLabelProps) => {
    return (
        <Box
            display="flex"
            alignItems="start !important"
            gap={1}
            sx={{
                backgroundColor: `${color}1A`,
                borderRadius: 2,
                padding: "4px 8px",
                minWidth: 100,
            }}
        >
            <Circle sx={{ color: color, width: '1rem', height: '1rem', mt: 0.5 }} />
            <Typography color={color}>
                {text}
            </Typography>
        </Box >
    );
};

export default StatusLabel;