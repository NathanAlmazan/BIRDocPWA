import React from 'react';
import ReactApexChart from 'react-apexcharts';
import merge from 'lodash/merge';
// @mui
import { useTheme, styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Card, CardHeader } from '@mui/material';
// api
import { useQuery } from '@apollo/client';
import { Analytics, DocumentTypes } from '../../api/threads/types';
import { GET_ALL_THREAD_TYPES } from '../../api/threads';
import { GET_DOCUMENT_STATUS_ANALYTICS } from '../../api/offices';
import { chartColors } from '.';
import { useAppSelector } from '../../redux/hooks';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 350;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface TypesReportDonutProps {
    officeId: number;
    completed: boolean;
}

export default function TypesReportDonut({ officeId, completed }: TypesReportDonutProps) {
  const theme = useTheme();
  const { role } = useAppSelector((state) => state.auth);
  const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
  const { data: analytics } = useQuery<{ getStatusAnalytics: Analytics[] }>(GET_DOCUMENT_STATUS_ANALYTICS, {
    variables: {
      officeId: officeId,
      completed: completed,
      superuser: role ? role.superuser : null
    }
  });
  const [chartValues, setChartValues] = React.useState<number[]>([]);

  const chartOptions = useChart({
    colors: chartColors,
    labels: threadTypes ? threadTypes.getAllThreadTypes.map(type => type.docType) : [],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: false, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: number) => seriesName.toFixed(2),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    }
  });

  React.useEffect(() => {
    if (analytics && threadTypes) {
      // setChartValues([35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75, 35, 125, 35, 35, 35, 80, 35, 20]);
      setChartValues(threadTypes.getAllThreadTypes.map(type => {
        const data = analytics.getStatusAnalytics.filter(d => d.docType.docId === type.docId);

        if (data.length > 0) return data.reduce((sum, a) => sum + a.count, 0);
        return 0;
      }))
    }
  }, [analytics, threadTypes])

  return (
    <Card>
      <CardHeader title={
          <Typography variant='h6'>
            {completed ? "Completed Documents" : "Pending Documents"}
          </Typography>
        } 
      />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart type="donut" series={chartValues} options={chartOptions} height={320} />
      </StyledChartWrapper>
    </Card>
  );
}


// ----------------------------------------------------------------------

export function useChart(options: any) {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: 'Total',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
  };

  const baseOptions = {
    // Colors
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.warning.dark,
      theme.palette.success.main,
      theme.palette.info.dark,
      theme.palette.info.light,
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily,
    },

    // States
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round',
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: false
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        borderRadius: 4,
        columnWidth: '28%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },

      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },

      // Radialbar
      radialBar: {
        track: {
          strokeWidth: '100%',
          background: alpha(theme.palette.grey[500], 0.16),
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },

      // Radar
      radar: {
        polygons: {
          fill: { colors: ['transparent'] },
          strokeColors: theme.palette.divider,
          connectorColors: theme.palette.divider,
        },
      },

      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.palette.divider,
        },
        spokes: {
          connectorColors: theme.palette.divider,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: '40%' } },
        },
      },
      {
        // md
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: '32%' } },
        },
      },
    ],
  };

  return merge(baseOptions, options);
}