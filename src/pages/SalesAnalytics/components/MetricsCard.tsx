import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricsCardProps {
  title: string;
  value: string;
  icon: string;
  growth?: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, icon, growth }) => {
  const isPositive = growth !== undefined && growth > 0;
  const growthColor = isPositive ? 'success.main' : 'error.main';

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {growth !== undefined && (
              <Typography
                variant="body2"
                color={growthColor}
                sx={{ mt: 1 }}
              >
                {growth >= 0 ? (
                  <TrendingUpIcon color="success" fontSize="small" />
                ) : (
                  <TrendingDownIcon color="error" fontSize="small" />
                )}
                {Math.abs(growth)}%
              </Typography>
            )}
          </Box>
          <Typography variant="h2">{icon}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}; 