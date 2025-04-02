import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Collapse, Divider, Pagination } from "@mui/material";
import CustomButton from "../CustomButton";
import DraggableRow from "../DragableRow";
import { StyledTableCell } from "../../helpers/MuiElements";
import LaunchIcon from '@mui/icons-material/Launch';

function createData(id, name, flowName,flowId, editedOn, description, details) {
  return { id, name, flowName, flowId, editedOn, description, details, pinned: false };
}

const initialRows = [
  createData("1", "Frozen yoghurt", "Workflow Name here...", "#159", "Zubin Khanna | 22:43 IST - 28/05", "Some description here regarding the flow..", [
    { time: "28/05 - 22:43 IST", status: "Passed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
  ]),
  createData("2", "Ice cream sandwich", "Workflow Name here...", "#160", "John Doe | 10:20 IST - 29/05", "Another description...",[
    { time: "28/05 - 22:43 IST", status: "Passed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
  ]),
  createData("3", "Eclair", "Workflow Name here...", "#161", "Jane Smith | 12:00 IST - 30/05", "More details...",[
    { time: "28/05 - 22:43 IST", status: "Passed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
  ]),
  createData("4", "Cupcake", "Workflow Name here...", "#162", "Alice Brown | 14:10 IST - 01/06", "Other info...",[
    { time: "28/05 - 22:43 IST", status: "Passed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
  ]),
  createData("5", "Gingerbread", "Workflow Name here...", "#163", "Bob White | 16:30 IST - 02/06", "Some extra text...",[
    { time: "28/05 - 22:43 IST", status: "Passed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
    { time: "28/05 - 22:43 IST", status: "Failed" },
  ]),
];

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(1);
  const [expandedRows, setExpandedRows] = React.useState({}); // Track expanded rows
  const rowsPerPage = 10;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 5 } }), // Prevents accidental drag on click
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = rows.findIndex((row) => row.id === active.id);
      const newIndex = rows.findIndex((row) => row.id === over.id);
      setRows(arrayMove(rows, oldIndex, newIndex));
    }
  };

  // Toggle pin status
  const togglePin = (id) => {
    setRows((prevRows) => {
      let updatedRows = prevRows.map((row) =>
        row.id === id ? { ...row, pinned: !row.pinned } : row
      );

      // Move pinned items to the top
      const pinnedRows = updatedRows.filter((row) => row.pinned);
      const unpinnedRows = updatedRows.filter((row) => !row.pinned);
      return [...pinnedRows, ...unpinnedRows];
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Paginate rows
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ padding: "20px" }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={rows} strategy={verticalListSortingStrategy}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Workflow Name</StyledTableCell>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Last Edited On</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <>
                    <DraggableRow key={row.id} row={row} togglePin={togglePin} expandedRows={expandedRows} setExpandedRows={setExpandedRows}/>
                    <TableRow sx={{ backgroundColor: "#FFF7F0", padding: "10px", borderRadius: "5px" }}>
                        <TableCell colSpan={5} sx={{ padding: 0 }} >
                        <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ backgroundColor: "#FFF7F0", padding: "10px", borderRadius: "5px" }}>
                            {row.details?.map((detail, index) => (
                                <Box key={index} display="flex" alignItems="center" gap={2} sx={{ marginBottom: "5px", padding: "10px" }}>
                                    {/* <span style={{ color: "orange" }}>●</span> */}
                                    <Divider style={{color:"black"}} sx={{color:"#000"}}>●</Divider>
                                    <span>{detail.time}</span>
                                    <CustomButton children={detail.status}  sx={{backgroundColor:(detail.status === "Passed") ? "#DDEBC0" : "#F8AEA8", color: "#000", fontSize:"12px", width:"52px", borderRadius: "2px", height: "22px"}}/>
                                    <LaunchIcon />
                                </Box>
                            ))}
                            </Box>
                        </Collapse>
                        </TableCell>
                    </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={Math.ceil(rows.length / rowsPerPage)} page={page} onChange={handleChangePage} />
      </Box>
    </TableContainer>
  );
}
