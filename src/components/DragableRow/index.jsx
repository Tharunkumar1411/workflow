
import { useSortable } from "@dnd-kit/sortable";
import { Box, IconButton, styled, TableRow } from "@mui/material";
import React from "react";
import { StyledTableCell } from "../../helpers/MuiElements";
import { MoreVert } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import selectedPin from "../../assets/images/selectedPin.png";
import unselectedPin from "../../assets/images/unselectedPin.png";
import { DASHBOARD_ACTION_BTN_STYLE, notifyUnderDev } from "../../helpers/Utils";

const StyledTableRow = styled(TableRow)(() => ({
    cursor: "grab", // Makes rows draggable
}));

export default function DraggableRow({ row, togglePin,expandedRows, setExpandedRows, hanldeEdit }) {
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

  const hanldeExecute = () => {notifyUnderDev()}

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

          <CustomButton children="Execute" sx={DASHBOARD_ACTION_BTN_STYLE} onClick={hanldeExecute}/>

          <CustomButton children="Edit"  sx={DASHBOARD_ACTION_BTN_STYLE} onClick={() => hanldeEdit(row.flowId)}/>

          <IconButton size="small">
            <MoreVert  onClick={() => notifyUnderDev()}/>
          </IconButton>

          <IconButton size="small" onClick={() => toggleExpand(row.id)}>
            {(expandedRows[row.id]) ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
}
