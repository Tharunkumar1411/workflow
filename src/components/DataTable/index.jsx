import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import { MoreVert, PushPin } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CustomButton from "../CustomButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    borderBottom: "1px solid #EE3425",
    fontSize: 14,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  cursor: "grab", // Makes rows draggable
}));

function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein, pinned: false };
}

const initialRows = [
  createData("1", "Frozen yoghurt", "Workflow Name here...", "#159", "Zubin Khanna | 22:43 IST - 28/05", "Some description here regarding the flow.."),
  createData("2", "Ice cream sandwich", "Workflow Name here...", "#160", "John Doe | 10:20 IST - 29/05", "Another description..."),
  createData("3", "Eclair", "Workflow Name here...", "#161", "Jane Smith | 12:00 IST - 30/05", "More details..."),
  createData("4", "Cupcake", "Workflow Name here...", "#162", "Alice Brown | 14:10 IST - 01/06", "Other info..."),
  createData("5", "Gingerbread", "Workflow Name here...", "#163", "Bob White | 16:30 IST - 02/06", "Some extra text..."),
];

function DraggableRow({ row, togglePin }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.id,
    disabled: row.pinned, // Prevent dragging if pinned
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    fontStyle: row.pinned ? "italic" : "normal",
  };

  return (
    <StyledTableRow ref={setNodeRef} sx={{ width: "100%" }} style={style} {...attributes} {...listeners}>
      <StyledTableCell align="left">{row.calories}</StyledTableCell>
      <StyledTableCell align="left">{row.fat}</StyledTableCell>
      <StyledTableCell align="left">{row.carbs}</StyledTableCell>
      <StyledTableCell align="left">{row.protein}</StyledTableCell>
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
            <PushPin sx={{ color: row.pinned ? "#F4C430" : "black", fontStyle: "italic" }} />
          </IconButton>

          <CustomButton children="Execute"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", height: "32px"}}/>


          <CustomButton children="Edit"  sx={{backgroundColor:"#fff", color: "#000", width:"fit-content", height: "32px"}}/>


          <IconButton size="small">
            <MoreVert />
          </IconButton>

          <IconButton size="small">
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default function DataTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(1);
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
                <DraggableRow key={row.id} row={row} togglePin={togglePin} />
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
