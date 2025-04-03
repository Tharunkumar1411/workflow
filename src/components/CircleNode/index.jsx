import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Handle, Position } from "reactflow";

export const CircleNode = ({ id, data }) => {
    return (
      <div style={{ position: "relative", textAlign: "center" }}>
        <div
          style={{
            background: data.color,
            color: "white",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            position: "relative",
          }}
        >
          {data.label}
        </div>
        {data?.label !== "End" && (
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
          >
            <IconButton
              size="small"
              onClick={(event) => data.onAdd(event, id)}
              style={{
                background: "white",
                border: "1px solid #ccc",
                width: 24,
                height: 24,
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </div>
        )}
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    );
  };