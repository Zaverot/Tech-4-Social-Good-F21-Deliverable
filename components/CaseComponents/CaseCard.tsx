import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  ButtonDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { useQuery } from "urql";
import { Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import EditCaseModal from "./Modals/EditCaseModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";
import { CastForEducationSharp } from "@material-ui/icons";

type CaseCardProps = {
  data: CaseData;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
};

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const [editCaseModalOpen, setEditCaseModalOpen] =
  React.useState<boolean>(false);
  const [deleteCaseModalOpen, setDeleteCaseModalOpen] =
  React.useState<boolean>(false);

  return (
  <>
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{
                position: "absolute",
                top: "0",
                right: "0",
              }}>
              <DropdownToggle>&#8942;</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setEditCaseModalOpen(true)}>Edit Case</DropdownItem>
                <DropdownItem onClick={() => setDeleteCaseModalOpen(true)}>Delete Case</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <CloseIcon />
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
        </Card>
      </div>
    </Container>
    <EditCaseModal
        onClose={() => setEditCaseModalOpen(false)}
        caseId = {caseData.id}
        open={editCaseModalOpen}
      />
      <DeleteCaseModal
        onClose={() => setDeleteCaseModalOpen(false)}
        caseId = {caseData.id}
        open={deleteCaseModalOpen}
      />
  </>
  );
};
      

export default CaseCard;
