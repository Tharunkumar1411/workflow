
import { useSortable } from "@dnd-kit/sortable";
import { Box, IconButton, styled, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell } from "../../helpers/MuiElements";
import { MoreVert } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import selectedPin from "../../assets/selectedPin.png";
import unselectedPin from "../../assets/unselectedPin.png";

const StyledTableRow = styled(TableRow)(() => ({
    cursor: "grab", // Makes rows draggable
}));

export default function DraggableRow({ row, togglePin,expandedRows, setExpandedRows }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.id,
    disabled: row.pinned, // Prevent dragging if pinned
  });

  const style = {
    transform: CSS.Transform?.toString(transform),
    transition,
    fontStyle: row.pinned ? "italic" : "normal",
  };

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <StyledTableRow ref={setNodeRef} sx={{ width: "100%" }} style={style} {...attributes} {...listeners}>
      <StyledTableCell align="left">{row.flowName}</StyledTableCell>
      <StyledTableCell align="left">{row.flowId}</StyledTableCell>
      <StyledTableCell align="left">{row.editedOn}</StyledTableCell>
      <StyledTableCell align="left">{row.description}</StyledTableCell>
      <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          {/* Prevent click lag by stopping event propagation */}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click from affecting drag
              togglePin(row.id);
            }}
          >
           {(row.pinned) ? <img src={selectedPin} /> : <img src={unselectedPin} />} 
          </IconButton>

          <CustomButton children="Execute"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", height: "32px"}}/>


          <CustomButton children="Edit"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", height: "32px"}}/>


          <IconButton size="small">
            <MoreVert />
          </IconButton>

          <IconButton size="small" onClick={() => toggleExpand(row.id)}>
            {(expandedRows[row.id]) ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
}
