import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectFees } from "./store/feesSlice";
import { visuallyHidden } from "@mui/utils";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Order = "asc" | "desc";

interface Data {
  feeStructureName: string;
  frequency: string;
  installment: number;
  amount: number;
  registerFee: number;
  course: Array<string>;
  studentCount: number;
}

function descendingComparator(a: IFees, b: IFees, orderBy: keyof IFees) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderBy: keyof IFees
): (a: IFees, b: IFees) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly IFees[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function List() {
  const feesValue = useSelector(selectFees);
  const [rows, setRows] = useState<IFees[]>(feesValue);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("feeStructureName");

  const requestSearch = (searchedVal: string) => {
    const filteredRows = feesValue.filter((row) => {
      return (
        row.feeStructureName
          .toLowerCase()
          .includes(searchedVal.toLowerCase()) ||
        row.course.filter((c) =>
          c.toLowerCase().includes(searchedVal.toLowerCase())
        ).length > 0
      );
    });
    setRows(filteredRows);
  };

  const navigate = useNavigate();

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "feeStructureName",
      numeric: false,
      disablePadding: true,
      label: "Fee Structure Name"
    },
    {
      id: "frequency",
      numeric: true,
      disablePadding: false,
      label: "Frequency"
    },
    {
      id: "installment",
      numeric: true,
      disablePadding: false,
      label: "Installment"
    },
    {
      id: "registerFee",
      numeric: true,
      disablePadding: false,
      label: "Register Fee"
    },
    {
      id: "course",
      numeric: false,
      disablePadding: false,
      label: "Courses"
    },
    {
      id: "studentCount",
      numeric: true,
      disablePadding: false,
      label: "Student Count"
    }
  ];

  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy]
  );

  useEffect(() => {
    setRows(visibleRows);
  }, [visibleRows]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const goToAddPage = () => {
    navigate("/");
  };

  return (
    <Paper>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) => {
          requestSearch(e.target.value);
        }}
      />

      {rows.length > 0 ? (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => {
                  return (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}>
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}>
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((fee: any, i: number) => (
                <TableRow key={i} hover sx={{ cursor: "pointer" }}>
                  <TableCell>{fee.feeStructureName}</TableCell>
                  <TableCell>{fee.frequency}</TableCell>
                  <TableCell>{fee.installment}</TableCell>
                  <TableCell>{fee.registerFee}</TableCell>
                  <TableCell>
                    {fee.course.map((c: string, i: number) => {
                      return <div key={i}>{c}</div>;
                    })}
                  </TableCell>
                  <TableCell>{fee.studentCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          No fee structure found
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <Button
          style={{
            marginTop: "10px",
            marginBottom: "10px"
          }}
          variant="contained"
          color="primary"
          onClick={goToAddPage}>
          Add Fee Structure
        </Button>
      </div>
    </Paper>
  );
}

export default List;
