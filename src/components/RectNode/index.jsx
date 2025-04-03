import { Add, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Handle, Position } from "reactflow";

export const RectNode = ({ id, data }) => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div
        style={{
          background: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px 20px",
          minWidth: 120,
          minHeight: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {data.label}

        <IconButton
          size="small"
          style={{
            position: "absolute",
            right: 5,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#f44336"
          }}
          onClick={() => data.onDelete && data.onDelete(id)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </div>

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
          onClick={(event) => data.onAdd && data.onAdd(event, id)}
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

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};