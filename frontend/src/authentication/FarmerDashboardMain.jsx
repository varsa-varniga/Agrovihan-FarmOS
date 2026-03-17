import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import BugReportIcon from "@mui/icons-material/BugReport";
import SchoolIcon from "@mui/icons-material/School";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const FarmerDashboardMain = ({ onAction }) => {
  const handleAction = (label) => {
    if (onAction) return onAction(label);
    // eslint-disable-next-line no-console
    console.log(label);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Card sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            My Fields
          </Typography>
          <ArrowDropDownIcon />
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 180,
                borderRadius: 2,
                bgcolor: "grey.200",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              Field Map
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Card variant="outlined" sx={{ p: 1.5 }}>
                <Typography fontWeight={600}>
                  Field A • Corn • 25 acres
                </Typography>
                <Typography variant="body2" color="success.main">
                  Healthy
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 1.5 }}>
                <Typography fontWeight={600}>
                  Field B • Soybean • 30 acres
                </Typography>
                <Typography variant="body2" color="warning.main">
                  Moderate
                </Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 1.5 }}>
                <Typography fontWeight={600}>
                  Field C • Wheat • 20 acres
                </Typography>
                <Typography variant="body2" color="info.main">
                  Flowering
                </Typography>
              </Card>
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => handleAction("Add Field")}
                >
                  Add Field
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleAction("Update Status")}
                >
                  Update Status
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Tasks & Alerts
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Box mt={1} display="flex" flexDirection="column" gap={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <NotificationsIcon color="success" />
                <Typography>Irrigation Today 6:00 AM</Typography>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={1}>
                <NotificationsIcon color="success" />
                <Typography>Fertilizer Tomorrow: Field B</Typography>
              </Box>
              <Divider />
              <Box display="flex" alignItems="center" gap={1}>
                <WarningIcon color="error" />
                <Typography color="error.main">
                  Pest Alert: Insect detected in Field C
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Market Prices
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Typography mt={1} fontWeight={600}>
              Wheat: $340 / ton
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Price Trend (Last 7 Days)
            </Typography>
            <Box
              sx={{
                mt: 1,
                height: 90,
                borderRadius: 2,
                bgcolor: "rgba(25,118,210,0.08)",
                display: "flex",
                alignItems: "flex-end",
                gap: 0.5,
                p: 1,
              }}
            >
              {[20, 32, 24, 36, 30, 44, 58].map((v, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "100%",
                    maxWidth: 16,
                    height: v,
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <TrendingUpIcon color="success" fontSize="small" />
              <Typography variant="body2">
                Best Selling Time: Next Week
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Resources
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <Typography>Fertilizer: 120 kg</Typography>
              <Typography>Seeds: 200 kg</Typography>
              <Typography>Pesticides: 50 L</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Pest & Disease
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Box
              sx={{
                mt: 1,
                height: 90,
                borderRadius: 2,
                bgcolor: "rgba(76,175,80,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              Nearby Outbreak
            </Box>
            <Button
              variant="contained"
              startIcon={<BugReportIcon />}
              sx={{ mt: 1 }}
              onClick={() => handleAction("Upload Photo for Analysis")}
            >
              Upload Photo for Analysis
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Financial Overview
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Typography mt={1} fontWeight={700}>
              Profit This Season: $8,200
            </Typography>
            <Box
              sx={{
                mt: 1,
                height: 90,
                borderRadius: 2,
                bgcolor: "rgba(76,175,80,0.08)",
                display: "flex",
                alignItems: "flex-end",
                gap: 0.5,
                p: 1,
              }}
            >
              {[18, 26, 22, 30, 24, 34, 40].map((v, i) => (
                <Box
                  key={i}
                  sx={{
                    width: "100%",
                    maxWidth: 16,
                    height: v,
                    bgcolor: i % 2 === 0 ? "success.main" : "warning.main",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary">
              Expenses vs. Income
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>
                Tips & Learning
              </Typography>
              <ArrowDropDownIcon />
            </Box>
            <Box mt={1} display="flex" flexDirection="column" gap={1}>
              <Typography fontWeight={600}>
                Tip of the Day: Proper Irrigation Techniques
              </Typography>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<PlayCircleOutlineIcon />}
                  onClick={() => handleAction("Watch Tip Video")}
                >
                  Watch Tip
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SchoolIcon />}
                  onClick={() => handleAction("Ask an Expert")}
                >
                  Ask an Expert
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {[
            "Record Harvest",
            "Check Market",
            "Request Advice",
            "Update Field",
          ].map((label) => (
            <Grid item xs={12} md={3} key={label}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleAction(label)}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default FarmerDashboardMain;
