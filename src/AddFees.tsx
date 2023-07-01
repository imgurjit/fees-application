import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, number, object, array } from "yup";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  FormControl
} from "@mui/material";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import ReactHookFormSelect from "./components/ReactHookFormSelect";
import { addFees } from "./store/feesSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const courses = ["Course1", "Course2", "Course3"];

const schema = object()
  .shape({
    feeStructureName: string().required("Fee Structure Name is required."),
    frequency: string().required("Frequency is required."),
    installment: number()
      .positive()
      .required("Installment is required.")
      .min(1, "Installment should be greater than 0"),
    amount: number()
      .positive()
      .required("Amount is required.")
      .min(1, "Amount should be greater than 0"),
    registerFee: number()
      .positive()
      .required("Register Fee is required.")
      .min(1, "Register Fee should be greater than 0"),
    course: array()
      .min(1, "Select atleast 1 course.")
      .required("Course is required."),
    studentCount: number()
      .positive()
      .required("Student Count is required.")
      .min(1, "Student Count should be greater than 0")
  })
  .required();

const AddFees = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IFees>({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const dispatch: Dispatch<any> = useDispatch();

  const addFeesStructure = useCallback(
    (fees: IFees) => dispatch(addFees(fees)),
    [dispatch]
  );

  const resetForm = () => {
    reset({
      feeStructureName: "",
      frequency: "Monthly",
      installment: 0,
      amount: 0,
      registerFee: 0,
      course: [],
      studentCount: 0
    });
  };

  const onSubmit = (data: IFees) => {
    console.log(JSON.stringify(data, null, 2));
    addFeesStructure(data);
    resetForm();
    goToList();
  };

  const goToList = () => {
    navigate("/list");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: 500 }} px={3} py={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="fullname"
              fullWidth
              label="Fee Structure Name"
              variant="outlined"
              {...register("feeStructureName")}
              error={errors.feeStructureName ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.feeStructureName?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl sx={{ m: 0, width: "100%" }}>
              <ReactHookFormSelect
                name="frequency"
                label="Frequency"
                control={control}
                error={errors.frequency ? true : false}
                defaultValue="Monthly"
                variant="outlined"
                margin="normal">
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quaterly">Quaterly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </ReactHookFormSelect>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors.frequency?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              type="number"
              defaultValue={0}
              fullWidth
              label="Installment"
              variant="outlined"
              {...register("installment")}
              error={errors.installment ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.installment?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              type="number"
              defaultValue={0}
              fullWidth
              label="Amount"
              variant="outlined"
              {...register("amount")}
              error={errors.amount ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.amount?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              type="number"
              defaultValue={0}
              fullWidth
              label="Register Fee"
              variant="outlined"
              {...register("registerFee")}
              error={errors.registerFee ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.registerFee?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl sx={{ m: 0, width: "100%" }}>
              <ReactHookFormSelect
                name="course"
                label="Courses"
                control={control}
                error={errors.course ? true : false}
                defaultValue={[]}
                variant="outlined"
                isMultiple
                margin="normal">
                {courses.map((c) => (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </FormControl>
            <Typography variant="inherit" color="textSecondary">
              {errors.course?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              type="number"
              defaultValue={0}
              fullWidth
              label="Student Count"
              variant="outlined"
              {...register("studentCount")}
              error={errors.studentCount ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.studentCount?.message}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}>
            Add
          </Button>

          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={resetForm}>
            Reset
          </Button>

          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="secondary"
            onClick={goToList}>
            Show List
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddFees;
