import { useEffect, useRef } from "react";
import { DashboardPage } from "../shared/components/DashboardPage";

const tableRows = [
  ["1,001", "random", "data", "placeholder", "text"],
  ["1,002", "placeholder", "irrelevant", "visual", "layout"],
  ["1,003", "data", "rich", "dashboard", "tabular"],
  ["1,003", "information", "placeholder", "illustrative", "data"],
  ["1,004", "text", "random", "layout", "dashboard"],
  ["1,005", "dashboard", "irrelevant", "text", "placeholder"],
  ["1,006", "dashboard", "illustrative", "rich", "data"],
  ["1,007", "placeholder", "tabular", "information", "irrelevant"],
  ["1,008", "random", "data", "placeholder", "text"],
  ["1,009", "placeholder", "irrelevant", "visual", "layout"],
  ["1,010", "data", "rich", "dashboard", "tabular"],
  ["1,011", "information", "placeholder", "illustrative", "data"],
  ["1,012", "text", "placeholder", "layout", "dashboard"],
  ["1,013", "dashboard", "irrelevant", "text", "visual"],
  ["1,014", "dashboard", "illustrative", "rich", "data"],
  ["1,015", "random", "tabular", "information", "text"],
];
function Icon({ name }: { name: string }) {
  return (
    <svg className="bi" aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
function Dashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = 260;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, width, height);

    const padding = { top: 18, right: 18, bottom: 34, left: 46 };
    const values = [
      15339, 21345, 18483, 24003, 23489, 24092, 12034, 15034, 19034, 22334,
      26334, 28334, 30034,
    ];
    const maxValue = 30000;
    const minValue = 0;
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    context.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
    context.lineWidth = 1;
    context.strokeStyle = "#dee2e6";
    context.fillStyle = "#6c757d";

    for (let tick = 0; tick <= 3; tick += 1) {
      const y = padding.top + (plotHeight / 3) * tick;
      context.beginPath();
      context.moveTo(padding.left, y);
      context.lineTo(width - padding.right, y);
      context.stroke();

      const label = String(30000 - tick * 10000);
      context.fillText(label, 8, y + 4);
    }

    const points = values.map((value, index) => {
      const x = padding.left + (plotWidth / (values.length - 1)) * index;
      const y =
        padding.top +
        plotHeight -
        ((value - minValue) / (maxValue - minValue)) * plotHeight;
      return { x, y };
    });

    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    });
    context.strokeStyle = "#0d6efd";
    context.lineWidth = 4;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.stroke();
  }, []);
  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
            >
              <Icon name="calendar3" />
              This week
            </button>
          </div>
        </div>

        <canvas
          ref={chartRef}
          className="my-4 w-100"
          id="myChart"
          aria-label="Weekly sales chart"
          role="img"
        />

        <h2>Section title</h2>
        <div className="table-responsive small">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={`${row[0]}-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardPage>
  );
}

export default Dashboard;
