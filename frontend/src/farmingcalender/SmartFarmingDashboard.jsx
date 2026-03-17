import React, { useMemo, useState } from "react";
import {
  Leaf,
  ListChecks,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ClipboardCheck,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CROPS = ["Paddy", "Tomato", "Wheat", "Maize", "Onion"];

const toDateKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SmartFarmingDashboard = ({ onBackToDashboard }) => {
  const [farmerId, setFarmerId] = useState("demo-farmer-001");
  const [cropName, setCropName] = useState("Paddy");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [todayTasks, setTodayTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [seasonPlan, setSeasonPlan] = useState(null);
  const [cropMeta, setCropMeta] = useState(null);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingToday, setLoadingToday] = useState(false);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [error, setError] = useState("");

  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const startPlan = async () => {
    setLoadingStart(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/smart-farming/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmer_id: farmerId,
          crop_name: cropName,
          start_date: startDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to initialize plan");
      }
      const data = await response.json();
      setCropMeta(data);
      await Promise.all([loadTodayTasks(), loadPendingTasks(), loadSeasonPlan()]);
    } catch (err) {
      setError(err.message || "Unable to start crop plan");
    } finally {
      setLoadingStart(false);
    }
  };

  const loadTodayTasks = async () => {
    if (!farmerId) return;
    setLoadingToday(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/smart-farming/tasks/${encodeURIComponent(farmerId)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch today's tasks");
      }
      const data = await response.json();
      setTodayTasks(data.tasks || []);
      setCropMeta((prev) => prev || data);
    } catch (err) {
      setTodayTasks([]);
      setError(err.message || "Unable to load today's tasks");
    } finally {
      setLoadingToday(false);
    }
  };

  const loadPendingTasks = async () => {
    if (!farmerId) return;
    setLoadingPending(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/smart-farming/pending/${encodeURIComponent(farmerId)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pending tasks");
      }
      const data = await response.json();
      setPendingTasks(data.tasks || []);
    } catch (err) {
      setPendingTasks([]);
      setError(err.message || "Unable to load pending tasks");
    } finally {
      setLoadingPending(false);
    }
  };

  const loadSeasonPlan = async () => {
    if (!farmerId) return;
    setLoadingPlan(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/smart-farming/plan/${encodeURIComponent(farmerId)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch season plan");
      }
      const data = await response.json();
      setSeasonPlan(data);
    } catch (err) {
      setSeasonPlan(null);
      setError(err.message || "Unable to load season plan");
    } finally {
      setLoadingPlan(false);
    }
  };

  const markComplete = async (task) => {
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/smart-farming/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmer_id: farmerId,
          task_name: task.task_name,
          date: toDateKey(task.date),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to mark task complete");
      }
      await Promise.all([loadTodayTasks(), loadPendingTasks(), loadSeasonPlan()]);
    } catch (err) {
      setError(err.message || "Unable to mark task complete");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(34,197,94,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.18), transparent 40%), linear-gradient(135deg, #f0fdf4 0%, #ecfeff 45%, #fefce8 100%)",
        padding: "32px 24px 48px",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor: "#dcfce7",
                color: "#166534",
                fontWeight: 600,
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              <Leaf size={16} />
              Crop Task Scheduler
            </div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                margin: 0,
                color: "#064e3b",
              }}
            >
              Smart Farming Planner
            </h1>
            <p
              style={{
                margin: "8px 0 0",
                color: "#0f766e",
                fontSize: "16px",
                maxWidth: "560px",
              }}
            >
              Pick a crop, set your start date, and get week-by-week tasks from
              the centralized schedule.
            </p>
          </div>

          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "1px solid #a7f3d0",
                backgroundColor: "white",
                color: "#065f46",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Back to Dashboard
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(15, 118, 110, 0.1)",
              border: "1px solid rgba(13,148,136,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#064e3b",
                fontWeight: 700,
              }}
            >
              Start Your Plan
            </h2>
            <p style={{ color: "#0f766e", margin: "8px 0 20px" }}>
              Initialize daily tasks for a farmer using the crop schedule.
            </p>

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#134e4a",
                marginBottom: "6px",
              }}
            >
              Farmer ID
            </label>
            <input
              type="text"
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #ccfbf1",
                backgroundColor: "white",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f766e",
                marginBottom: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#134e4a",
                marginBottom: "6px",
              }}
            >
              Crop
            </label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #ccfbf1",
                backgroundColor: "#f0fdfa",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f766e",
                marginBottom: "16px",
              }}
            >
              {CROPS.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>

            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#134e4a",
                marginBottom: "6px",
              }}
            >
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #ccfbf1",
                backgroundColor: "white",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f766e",
                marginBottom: "16px",
              }}
            />

            <button
              onClick={startPlan}
              disabled={loadingStart}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                background:
                  "linear-gradient(135deg, #22c55e 0%, #0f766e 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                cursor: loadingStart ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {loadingStart ? (
                <>
                  <RefreshCw size={16} className="spin" />
                  Initializing
                </>
              ) : (
                <>
                  <ClipboardCheck size={16} />
                  Start Smart Farming Plan
                </>
              )}
            </button>

            {error && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  borderRadius: "12px",
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(8, 145, 178, 0.12)",
              border: "1px solid rgba(6,182,212,0.1)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#0f766e",
                fontWeight: 700,
              }}
            >
              Today's Tasks
            </h2>
            <p style={{ color: "#0891b2", margin: "8px 0 20px" }}>
              {cropMeta?.crop_name
                ? `${cropMeta.crop_name} plan for ${todayKey}`
                : "Load today's tasks once the plan starts."}
            </p>

            {!todayTasks.length && !loadingToday && (
              <div
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  border: "1px dashed #a5f3fc",
                  backgroundColor: "#ecfeff",
                  color: "#0f766e",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Start a plan or refresh tasks to see today's work list.
              </div>
            )}

            {loadingToday && (
              <div
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  backgroundColor: "#f0fdfa",
                  color: "#0f766e",
                  fontWeight: 600,
                }}
              >
                Loading today's tasks...
              </div>
            )}

            {!!todayTasks.length && !loadingToday && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 700,
                    color: "#0f766e",
                    marginBottom: "12px",
                  }}
                >
                  <CheckCircle2 size={18} />
                  {todayTasks.length} tasks scheduled today
                </div>
                <div style={{ display: "grid", gap: "12px" }}>
                  {todayTasks.map((task, index) => (
                    <div
                      key={`${task.task_name}-${index}`}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: "1px solid #ccfbf1",
                        backgroundColor: "#f0fdfa",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "#065f46",
                            marginBottom: "4px",
                          }}
                        >
                          {task.task_name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#0f766e" }}>
                          Priority {task.priority}
                        </div>
                      </div>
                      <button
                        onClick={() => markComplete(task)}
                        disabled={task.completed}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: "1px solid #bbf7d0",
                          backgroundColor: task.completed
                            ? "#dcfce7"
                            : "#ffffff",
                          color: "#065f46",
                          fontWeight: 600,
                          cursor: task.completed ? "not-allowed" : "pointer",
                        }}
                      >
                        {task.completed ? "Completed" : "Mark Complete"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: "28px",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "26px",
            boxShadow: "0 14px 40px rgba(15, 118, 110, 0.1)",
            border: "1px solid rgba(13,148,136,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#064e3b",
                  fontWeight: 700,
                }}
              >
                Overdue Tasks
              </h2>
              <p style={{ color: "#0f766e", margin: "6px 0 0" }}>
                Not completed for more than 1 day.
              </p>
            </div>
            <button
              onClick={() =>
                Promise.all([loadTodayTasks(), loadPendingTasks(), loadSeasonPlan()])
              }
              disabled={loadingPending || loadingToday || loadingPlan}
              style={{
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid #bbf7d0",
                backgroundColor: "#ecfdf5",
                color: "#065f46",
                fontWeight: 600,
                cursor:
                  loadingPending || loadingToday || loadingPlan
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {loadingPending && (
            <div
              style={{
                padding: "14px",
                borderRadius: "12px",
                backgroundColor: "#f0fdfa",
                color: "#0f766e",
                fontWeight: 600,
              }}
            >
              Loading overdue tasks...
            </div>
          )}

          {!loadingPending && !pendingTasks.length && (
            <div
              style={{
                padding: "14px",
                borderRadius: "12px",
                backgroundColor: "#f0fdf4",
                color: "#166534",
                fontWeight: 600,
              }}
            >
              No overdue tasks. Great job!
            </div>
          )}

          {!loadingPending && pendingTasks.length > 0 && (
            <div style={{ display: "grid", gap: "12px" }}>
              {pendingTasks.map((task, index) => (
                <div
                  key={`${task.task_name}-${index}`}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    backgroundColor: "#fff7ed",
                    border: "1px solid #fed7aa",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: "#9a3412" }}>
                      {task.task_name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#b45309" }}>
                      Due: {toDateKey(task.date)}
                    </div>
                  </div>
                  <button
                    onClick={() => markComplete(task)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "10px",
                      border: "1px solid #fdba74",
                      backgroundColor: "#fff7ed",
                      color: "#9a3412",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "32px auto 0",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "26px",
          boxShadow: "0 14px 40px rgba(15, 118, 110, 0.1)",
          border: "1px solid rgba(13,148,136,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#064e3b",
                fontWeight: 700,
              }}
            >
              Overall Harvest Season Plan
            </h2>
            <p style={{ color: "#0f766e", margin: "6px 0 0" }}>
              Full daily plan grouped by week for{" "}
              {seasonPlan?.crop_name || "your crop"}.
            </p>
          </div>
          <button
            onClick={loadSeasonPlan}
            disabled={loadingPlan}
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              fontWeight: 600,
              cursor: loadingPlan ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <RefreshCw size={16} />
            Load Plan
          </button>
        </div>

        {loadingPlan && (
          <div
            style={{
              padding: "14px",
              borderRadius: "12px",
              backgroundColor: "#f0fdfa",
              color: "#0f766e",
              fontWeight: 600,
            }}
          >
            Loading season plan...
          </div>
        )}

        {!loadingPlan && !seasonPlan && (
          <div
            style={{
              padding: "14px",
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              fontWeight: 600,
            }}
          >
            Start a plan to view the full season schedule.
          </div>
        )}

        {!loadingPlan && seasonPlan?.weeks?.length > 0 && (
          <div style={{ display: "grid", gap: "12px" }}>
            {seasonPlan.weeks.map((week) => (
              <details
                key={week.week}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "12px 16px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: 700,
                    color: "#0f766e",
                  }}
                >
                  <ListChecks size={18} />
                  Week {week.week}
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    {week.start_date} - {week.end_date}
                  </span>
                </summary>
                <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
                  {week.tasks.map((task, index) => (
                    <div
                      key={`${task.task_name}-${index}`}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div style={{ color: "#0f172a", fontWeight: 600 }}>
                          {task.task_name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          {task.date}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: task.completed ? "#16a34a" : "#0f766e",
                        }}
                      >
                        <span>Priority {task.priority}</span>
                        <span>•</span>
                        <span>{task.completed ? "Completed" : "Pending"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          details > summary::-webkit-details-marker {
            display: none;
          }

          .spin {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SmartFarmingDashboard;
