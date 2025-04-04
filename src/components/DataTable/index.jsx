import * as React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Collapse, Divider, Pagination,
  CircularProgress,
  Typography
} from "@mui/material";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

import CustomButton from "../CustomButton";
import DraggableRow from "../DragableRow";
import { StyledTableCell } from "../../helpers/MuiElements";
import LaunchIcon from '@mui/icons-material/Launch';
import { notifyUnderDev, transformApiData } from "../../helpers/Utils";
import { getWorkflow } from "../../api/workflow";
import { useNavigate } from "react-router";
import { PAGES_ROUTES } from "../../AppRoute/routes"
import useFlowStore from "../../store/Flow";

export default function DataTable({ searchInput }) {
  const [rows, setRows] = React.useState([]);
  const [apiData, setApiData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [expandedRows, setExpandedRows] = React.useState({});
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const {saveWorkflow} = useFlowStore(state => state);
  const [loading, setLoading] = React.useState(true);


  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Fetch and transform data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await getWorkflow();
        const formatted = transformApiData(response);
        setApiData(formatted);
        setRows(formatted);
        saveWorkflow(formatted)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // End loader
      }
    };
    fetchData();
  }, []);

  // Handle search
  React.useEffect(() => {
    if (!searchInput) {
      setRows(apiData);
    } else {
      const filtered = apiData.filter(item =>
        item.flowId.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.flowName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setRows(filtered);
    }
  }, [searchInput, apiData]);

  // Handle drag end
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = rows.findIndex(row => row.id === active.id);
      const newIndex = rows.findIndex(row => row.id === over.id);
      setRows(arrayMove(rows, oldIndex, newIndex));
    }
  };

  // Toggle pin
  const togglePin = (id) => {
    setRows((prevRows) => {
      const updated = prevRows?.map(row =>
        row.id === id ? { ...row, pinned: !row.pinned } : row
      );
      const pinned = updated.filter(row => row.pinned);
      const unpinned = updated.filter(row => !row.pinned);
      return [...pinned, ...unpinned];
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const hanldeEdit = (id) => {
    navigate(`${PAGES_ROUTES.WORKFLOW}/${id}`)
  }

  return (
    <TableContainer component={Paper} sx={{ padding: "20px" }}>

    {loading ? (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
        <CircularProgress />
        <Typography variant="body2" mt={2}>Loading workflows...</Typography>
      </Box>
    ) : (
      <>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={rows?.map(row => row.id)} strategy={verticalListSortingStrategy}>
            <Table aria-label="workflow table">
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
                {paginatedRows?.map(row => (
                  <React.Fragment key={row.id}>
                    <DraggableRow
                      row={row}
                      togglePin={togglePin}
                      expandedRows={expandedRows}
                      setExpandedRows={setExpandedRows}
                      hanldeEdit={hanldeEdit}
                    />
                    <TableRow sx={{ backgroundColor: "#FFF7F0" }}>
                      <TableCell colSpan={5} sx={{ padding: 0 }}>
                        <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                          <Box sx={{ backgroundColor: "#FFF7F0", padding: "10px", borderRadius: "5px" }}>
                            {row.details?.map((detail, index) => (
                              <Box key={index} display="flex" alignItems="center" gap={2} sx={{ marginBottom: "5px" }}>
                                <Divider sx={{ color: "#EE3425" }}>●</Divider>
                                <span>{detail.time}</span>
                                <CustomButton
                                  children={detail.status}
                                  sx={{
                                    backgroundColor: detail.status === "Passed" ? "#DDEBC0" : "#F8AEA8",
                                    color: "#000",
                                    fontSize: "12px",
                                    width: "52px",
                                    borderRadius: "2px",
                                    height: "22px"
                                  }}
                                />
                                  <LaunchIcon  onClick={() => notifyUnderDev()}/>
                              </Box>
                            ))}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </>
    )}
    

      {/* Pagination */}
    
      
    </TableContainer>
  );
}
