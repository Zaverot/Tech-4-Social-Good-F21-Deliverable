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

type DeleteCaseModalProps = {
  open: boolean;
  caseId: number;
  onClose: () => void;
};

const DeleteCaseMutation = `
mutation DeleteCaseMutation($caseId: bigint) {
    delete_cases(where: {id: {_eq: $caseId}}) {
      affected_rows
    }
  }
`;


const DeleteCaseModal: React.FC<DeleteCaseModalProps> = (props: DeleteCaseModalProps) => {
  const classes = useStyles();
  const caseId = props.caseId;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);

  const [result, executeMutation] = useMutation(DeleteCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Case
        <br/>
        <h3>Warning: This action cannot be undone. Do you wish to proceed?</h3>
      </Typography>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              caseId: caseId,
            });
            props.onClose();
          }}
        >
          Delete Case
        </Button>
      </Box>
    </StyledModal>
  );
};
export default DeleteCaseModal;
