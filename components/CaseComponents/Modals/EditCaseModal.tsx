import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";
import { Category } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type EditCaseModalProps = {
  open: boolean;
  caseId: number;
  onClose: () => void;
};

const EditCaseMutation = `
mutation EditCaseMutation($description: String = "", $name: String = "", $status: String = "", $caseId: bigint) {
  update_cases(where: {id: {_eq: $caseId}}, _set: {description: $description, name: $name, status: $status,}) {
    affected_rows
  }
}
`;

const EditCaseQuery = `
query EditCaseQuery($caseId: bigint) {
  cases(where: {id: {_eq: $caseId}}, limit: 1) {
    description
    id
    name
    status
  }
}
`;

const EditCaseModal: React.FC<EditCaseModalProps> = (props: EditCaseModalProps) => {
  const classes = useStyles();
  const caseId = props.caseId;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: EditCaseQuery,
    variables: { caseId },
  });

  const [result, executeMutation] = useMutation(EditCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Edit Case
        <br/>
        {data
            ? data.cases.map((category: any, index: number) => {
                return <h3 key={index}> {category.name} </h3>
              })
            : "Something went wrong"}
      </Typography>
      <Box>
        <TextField
          id="standard-full-width"
          label="Name"
          placeholder={"New Case Name"}
          fullWidth
          margin="normal"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Description"
          placeholder="New Case Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            fullWidth
            value={status}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setStatus(event.target.value as string);
            }}
          >
            <MenuItem value={"To Do"}>To Do</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              description,
              name,
              status,
              caseId: caseId,
            });
            props.onClose();
          }}
        >
          Save Changes
        </Button>
      </Box>
    </StyledModal>
  );
};
export default EditCaseModal;
